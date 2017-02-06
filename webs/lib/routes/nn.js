import {appendFile, readFile} from 'fs'

export const NeuronType = {
    NONE: "NONE",
    INPUT: "INPUT",
    HIDDEN: "HIDDEN",
    OUTPUT: "OUTPUT"
};

export const LinkType = {
    NONE: "NONE",
    INPUT_TO_HIDDEN: "INPUT_TO_HIDDEN",
    HIDDEN_TO_HIDDEN: "HIDDEN_TO_HIDDEN",
    HIDDEN_TO_OUTPUT: "HIDDEN_TO_OUTPUT"
};

export function derivativeFn(x) {
    return x * (1 - x);
}

export class Neuron {
    constructor(type = NeuronType.NONE, key = -1, value = 0.0, bias) {
        this.type = type;
        this.value = value || 0.0;
        this.key = key || 0;
        this.bias = bias || +(Math.random() * (0.9 - 0) + 0).toFixed(4);
    }

    static fromConfig(config){
        return new Neuron(config.type, config.value, config.key, config.bias);
    }

    fn(x) {
        return 1.0 / (1.0 + Math.exp(-x));
    }

    computeValue(inputValue) {
        this.value = this.fn(inputValue);
    }

    getValue() {
        return this.value;
    }

    setValue(value) {
        this.value = value;
    }

    setError(error) {
        this.error = error;
        this.setBias();
    }

    getError() {
        return this.error;
    }

    setBias() {
        this.bias += this.error;
    }
}

export class Link {
    constructor(type = LinkType.NONE, neuronFromKey = -1, neuronToKey = -1, weight = 0.0) {
        this.type = type;
        this.neuronFromKey = neuronFromKey;
        this.neuronToKey = neuronToKey;
        this.weight = weight || +(Math.random() * (0.9 - 0) + 0).toFixed(4);
    }

    static fromConfig(config){
        return new Link(config.type, config.neuronFromKey, config.neuronToKey, config.weight);
    }

    generateWeight() {
        this.weight = +(Math.random() * (0.9 - 0) + 0).toFixed(4);
    }

    setDeltaWeight(delta) {
        this.prevDeltaWeight = this.deltaWeight;
        this.deltaWeight = delta;
    }

    getDeltaWeight() {
        return this.deltaWeight;
    }

    getPrevDeltaWeight() {
        return this.prevDeltaWeight;
    }

    setWeight(weight) {
        this.weight = weight;
    }

    getWeight() {
        return this.weight;
    }
}

export class NN {
    constructor(networkConfiguration) {
        this.config = networkConfiguration;

        this.networkPreInit();
        this.createReferences();

    }

    networkPreInit() {
        this.initCore();
        for (let layer of this.config.layers)
            this.createLayer(layer);
    }

    initCore(){
        this.inputSize = this.config.layers.find(l => l.type === NeuronType.INPUT).size;
        this.hiddenSize = this.config.layers.find(l => l.type === NeuronType.HIDDEN).size;
        this.outputSize = this.config.layers.find(l => l.type === NeuronType.OUTPUT).size;

        this.network = [];
    }

    createLayer(layer) {
        for (let i = 0; i < layer.size; i++)
            this.network.push(new Neuron(layer.type, i));
    }

    createReferences() {
        this.references = [];

        for (let h = 0; h < this.hiddenSize; h++) {

            for (let i = 0; i < this.inputSize; i++)
                this.references.push(new Link(LinkType.INPUT_TO_HIDDEN, i, h));

            for (let o = 0; o < this.outputSize; o++)
                this.references.push(new Link(LinkType.HIDDEN_TO_OUTPUT, h, o));
        }
    }

    computeNeuronsValue(neuronType, linkType, fn, print) {
        return this.network.filter(h => h.type === neuronType).forEach((h) => {
            h.computeValue(this.references.filter(r => r.type === linkType && r.neuronToKey === h.key)
                    .reduce((prev, curr) => (prev + (curr.weight * fn(curr))), 0) + h.bias);

            if (neuronType === NeuronType.OUTPUT)
                if (print)
                    print(h.getValue());
            //this.outputValue = h.getValue();
        });
    }


    computeGlobalError(derivativeFunc) {
        this.network.filter(n => n.type === NeuronType.OUTPUT).forEach((o) => {
            this.error = derivativeFn(o.getValue()) * (derivativeFunc(o) - o.getValue());
            o.setError(this.error);
            this.computeHiddenErrors(o);
        });
    }

    computeHiddenErrors(o) {
        this.references.filter(r => r.type === LinkType.HIDDEN_TO_OUTPUT && r.neuronToKey === o.key).forEach(ref => {
            let hiddenNeuron = this.network.find(n => n.type === NeuronType.HIDDEN && n.key === ref.neuronFromKey);
            let newWeight = ref.getWeight() + (o.error * hiddenNeuron.value);
            ref.setWeight(newWeight);
            hiddenNeuron.setError(derivativeFn(hiddenNeuron.getValue()) * o.error * newWeight);
        });
    }

    adjustInputs(derivativeFunc) {
        this.network.filter(h => h.type === NeuronType.HIDDEN).forEach((h) => {
            this.references.filter(r => r.type === LinkType.INPUT_TO_HIDDEN && r.neuronToKey === h.key).forEach(ref => {
                let newWeight = ref.getWeight() + (h.getError() * derivativeFunc(ref));
                ref.setWeight(newWeight);
                h.setBias();
            });
        });
    }

    trainNetwork(trainInputs, trainAnswers, fn) {

        this.prevError = 2;
        this.error = 1;

        this.learnCycles = 0;

        while (this.learnCycles < this.config.cycles) {

            this.learnCycles++;
            for (let randomSet = 0; randomSet < trainInputs.length; randomSet++) {

                this.computeNeuronsValue(NeuronType.HIDDEN, LinkType.INPUT_TO_HIDDEN, (curr) => trainInputs[randomSet][curr.neuronFromKey]);
                this.computeNeuronsValue(NeuronType.OUTPUT, LinkType.HIDDEN_TO_OUTPUT, (curr) => this.network.find(n => n.type === NeuronType.HIDDEN && n.key === curr.neuronFromKey).value);

                this.computeGlobalError(o => trainAnswers[randomSet][o.key]);
                this.adjustInputs((ref) => trainInputs[randomSet][ref.neuronFromKey]);
            }

            if (this.learnCycles === this.config.cycles)
                return fn();

            if (this.learnCycles % 1000 === 0)
                console.log('LEARN CYCLES ', this.learnCycles);
        }

    }

    run(data, outputFn) {
        let output = [];
        this.computeNeuronsValue(NeuronType.HIDDEN, LinkType.INPUT_TO_HIDDEN, (ref) => data[ref.neuronFromKey]);
        this.computeNeuronsValue(NeuronType.OUTPUT, LinkType.HIDDEN_TO_OUTPUT, (curr) => this.network.find(n => n.type === NeuronType.HIDDEN && n.key === curr.neuronFromKey).value, (value) => {

            output.push(value);
            if (output.length === this.outputSize)
                outputFn(output);
            // console.log('OUT ', value);
        });
    }

    networkStringConfiguration() {
        const networkSaveConfig = {
            configuration: this.config,
            network: this.network,
            references: this.references,
            learnCycles: this.learnCycles
        };

        return JSON.stringify(networkSaveConfig);
    }

    serializeToFile() {
        appendFile("d://network.txt", this.networkStringConfiguration(), (err) => {
            console.log('append err ', err);
        });
    }

    deserializeFromFile(path) {
        readFile(path, "utf8", (err, content) => {
            if (!err) {
                this.deserializeObj = JSON.parse(content);
                this.config = this.deserializeObj.configuration;
                this.network = this.deserializeObj.network.map((c) => Neuron.fromConfig(c));
                this.references = this.deserializeObj.references.map((c) => Link.fromConfig(c));
                this.learnCycles = this.deserializeObj.learnCycles;

                console.log('SUCCESS DESEREALIZING', this.learnCycles);
            }
            else
                console.log('FAILED DESERIALIZE NETWORK FILE');
        });
    }
}

