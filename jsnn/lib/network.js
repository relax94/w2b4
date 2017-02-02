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


export class Neuron {
    constructor(type = NeuronType.NONE, key = -1) {
        this.type = type;
        this.value = 0.0;
        this.key = key;
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
    }

    getError() {
        return this.error;
    }
}

export class Link {
    constructor(type = LinkType.NONE, neuronFromKey = -1, neuronToKey = -1) {
        this.type = type;
        this.neuronFromKey = neuronFromKey;
        this.neuronToKey = neuronToKey;
        this.generateWeight();
        this.deltaWeight = 0.0;
        this.prevDeltaWeight = 0.0;
    }

    generateWeight() {
        this.weight = Math.floor(Math.random() * (0.5 - 0) + 0);
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
        this.B = 0.8;
        this.L = 0.9;

        this.networkPreInit();
        this.createReferences();
        this.trainNetwork({});
    }

    networkPreInit() {
        this.inputSize = this.config.layers.find(l => l.type === NeuronType.INPUT).size;
        this.hiddenSize = this.config.layers.find(l => l.type === NeuronType.HIDDEN).size;
        this.outputSize = this.config.layers.find(l => l.type === NeuronType.OUTPUT).size;

        this.network = [];
        for (let layer of this.config.layers)
            this.createLayer(layer);
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


    trainNetwork(trainConfig) {

        this.network = [];
        this.references = [];

        this.network.push(new Neuron(NeuronType.INPUT, 0));
        this.network.push(new Neuron(NeuronType.INPUT, 1));

        this.network.push(new Neuron(NeuronType.OUTPUT, 0));

        this.network.push(new Neuron(NeuronType.HIDDEN, 0));
        this.network.push(new Neuron(NeuronType.HIDDEN, 1));



        this.references.push(new Link(LinkType.INPUT_TO_HIDDEN, 0, 0));
        this.references.push(new Link(LinkType.INPUT_TO_HIDDEN, 1, 0));

        this.references.push(new Link(LinkType.INPUT_TO_HIDDEN, 0, 1));
        this.references.push(new Link(LinkType.INPUT_TO_HIDDEN, 1, 1));

        this.references.push(new Link(LinkType.HIDDEN_TO_OUTPUT, 0, 0));
        this.references.push(new Link(LinkType.HIDDEN_TO_OUTPUT, 1, 0));

        let trainInputs = [
            [1, 1, 1],
            [0, 0, 0],
            [1, 0, 0],
            [0, 1, 0]
        ];


        let randomSet = -1;

        this.prevError = 2;
        this.error = 1;

        this.learnCycles = 0;
        this.learnHash = { 0: 0, 1: 0, 2: 0, 3: 0 };

        while (this.learnCycles < 2000) {

            this.learnCycles++;
            for (let rnd = 0; rnd < trainInputs.length; rnd++) {
                randomSet = rnd;
                this.learnHash[randomSet]++;

                this.prevError = this.error;

                for (let h of this.network.filter(h => h.type === NeuronType.HIDDEN)) {
                    let refs = this.references.filter(r => r.type === LinkType.INPUT_TO_HIDDEN && r.neuronToKey === h.key);
                    let value = 0;
                    for (let ref of refs) {
                        value += ref.weight * trainInputs[randomSet][ref.neuronFromKey];
                    }
                    h.computeValue(value);
                }

                for (let o of this.network.filter(o => o.type === NeuronType.OUTPUT)) {
                    let refs = this.references.filter(r => r.type === LinkType.HIDDEN_TO_OUTPUT && r.neuronToKey === o.key);
                    let value = 0;
                    for (let ref of refs) {
                        value += ref.weight * this.network.find(n => n.type === NeuronType.HIDDEN && n.key === ref.neuronFromKey).value;
                    }
                    o.computeValue(value);

                    if (this.learnCycles > 1800)
                        console.log(o.getValue());

                    this.error = o.getValue() * (1 - o.getValue()) * (trainInputs[randomSet][2] - o.getValue());

                    for (let ref of refs) {
                        let hiddenNeuron = this.network.find(n => n.type === NeuronType.HIDDEN && n.key === ref.neuronFromKey);
                        ref.setDeltaWeight(this.B * this.error * hiddenNeuron.value);
                        let newWeight = ref.getWeight() + ref.getDeltaWeight() + (this.L * ref.getPrevDeltaWeight());
                        ref.setWeight(newWeight);

                        hiddenNeuron.setError(this.error * newWeight);
                    }
                }


                for (let h of this.network.filter(h => h.type === NeuronType.HIDDEN)) {
                    let refs = this.references.filter(r => r.type === LinkType.INPUT_TO_HIDDEN && r.neuronToKey === h.key);
                    for (let ref of refs) {
                        // let inputNeuron = this.network.find(n => n.type === NeuronType.INPUT && n.key === ref.neuronFromKey);
                        // ref.setDeltaWeight(this.B * h.getError() * inputNeuron.getValue());
                        ref.setDeltaWeight(this.B * h.getError() * trainInputs[randomSet][ref.neuronFromKey]);
                        let newWeight = ref.getWeight() + ref.getDeltaWeight() + (this.L * ref.getPrevDeltaWeight());;
                        ref.setWeight(newWeight);
                    }
                }



            }

        }
        // this.run([1, 1]);
        // this.run([0, 1]);
        // this.run([1, 0]);
        // this.run([0, 0]);

        // console.log('LH ', this.learnHash);

    }

    run(data) {

        for (let h of this.network.filter(h => h.type === NeuronType.HIDDEN)) {
            let refs = this.references.filter(r => r.type === LinkType.INPUT_TO_HIDDEN && r.neuronToKey === h.key);
            let value = 0;
            for (let ref of refs) {
                // value += ref.weight * this.network.find(n => n.type === NeuronType.INPUT && n.key === ref.neuronFromKey).value;
                value += ref.weight * data[ref.neuronFromKey];
            }
            h.computeValue(value);
        }


        for (let o of this.network.filter(o => o.type === NeuronType.OUTPUT)) {
            let refs = this.references.filter(r => r.type === LinkType.HIDDEN_TO_OUTPUT && r.neuronToKey === o.key);
            let value = 0;
            for (let ref of refs) {
                value += ref.weight * this.network.find(n => n.type === NeuronType.HIDDEN && n.key === ref.neuronFromKey).value;
            }
            o.computeValue(value);
            console.log(`RUN RESULT ${data[0]} & ${data[1]} ->  ${o.getValue()}`);
        }
    }

}

const N = new NN({
    layers: [{
        type: NeuronType.INPUT,
        size: 2
    },
    {
        type: NeuronType.HIDDEN,
        size: 3
    },
    {
        type: NeuronType.OUTPUT,
        size: 1
    }]
});