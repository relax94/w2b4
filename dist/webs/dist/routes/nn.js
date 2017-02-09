"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NN = exports.Link = exports.Neuron = exports.LinkType = exports.NeuronType = undefined;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

exports.derivativeFn = derivativeFn;

var _fs = require("fs");

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var NeuronType = exports.NeuronType = {
    NONE: "NONE",
    INPUT: "INPUT",
    HIDDEN: "HIDDEN",
    OUTPUT: "OUTPUT"
};

var LinkType = exports.LinkType = {
    NONE: "NONE",
    INPUT_TO_HIDDEN: "INPUT_TO_HIDDEN",
    HIDDEN_TO_HIDDEN: "HIDDEN_TO_HIDDEN",
    HIDDEN_TO_OUTPUT: "HIDDEN_TO_OUTPUT"
};

function derivativeFn(x) {
    return x * (1 - x);
}

var Neuron = exports.Neuron = function () {
    function Neuron() {
        var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NeuronType.NONE;
        var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
        var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.0;
        var bias = arguments[3];

        _classCallCheck(this, Neuron);

        this.type = type;
        this.value = value || 0.0;
        this.key = key || 0;
        this.bias = bias || +(Math.random() * (0.9 - 0) + 0).toFixed(4);
    }

    _createClass(Neuron, [{
        key: "fn",
        value: function fn(x) {
            return 1.0 / (1.0 + Math.exp(-x));
        }
    }, {
        key: "computeValue",
        value: function computeValue(inputValue) {
            this.value = this.fn(inputValue);
        }
    }, {
        key: "getValue",
        value: function getValue() {
            return this.value;
        }
    }, {
        key: "setValue",
        value: function setValue(value) {
            this.value = value;
        }
    }, {
        key: "setError",
        value: function setError(error) {
            this.error = error;
            this.setBias();
        }
    }, {
        key: "getError",
        value: function getError() {
            return this.error;
        }
    }, {
        key: "setBias",
        value: function setBias() {
            this.bias += this.error;
        }
    }], [{
        key: "fromConfig",
        value: function fromConfig(config) {
            return new Neuron(config.type, config.value, config.key, config.bias);
        }
    }]);

    return Neuron;
}();

var Link = exports.Link = function () {
    function Link() {
        var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : LinkType.NONE;
        var neuronFromKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
        var neuronToKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
        var weight = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0.0;

        _classCallCheck(this, Link);

        this.type = type;
        this.neuronFromKey = neuronFromKey;
        this.neuronToKey = neuronToKey;
        this.weight = weight || +(Math.random() * (0.9 - 0) + 0).toFixed(4);
    }

    _createClass(Link, [{
        key: "generateWeight",
        value: function generateWeight() {
            this.weight = +(Math.random() * (0.9 - 0) + 0).toFixed(4);
        }
    }, {
        key: "setDeltaWeight",
        value: function setDeltaWeight(delta) {
            this.prevDeltaWeight = this.deltaWeight;
            this.deltaWeight = delta;
        }
    }, {
        key: "getDeltaWeight",
        value: function getDeltaWeight() {
            return this.deltaWeight;
        }
    }, {
        key: "getPrevDeltaWeight",
        value: function getPrevDeltaWeight() {
            return this.prevDeltaWeight;
        }
    }, {
        key: "setWeight",
        value: function setWeight(weight) {
            this.weight = weight;
        }
    }, {
        key: "getWeight",
        value: function getWeight() {
            return this.weight;
        }
    }], [{
        key: "fromConfig",
        value: function fromConfig(config) {
            return new Link(config.type, config.neuronFromKey, config.neuronToKey, config.weight);
        }
    }]);

    return Link;
}();

var NN = exports.NN = function () {
    function NN(networkConfiguration) {
        _classCallCheck(this, NN);

        this.config = networkConfiguration;

        this.networkPreInit();
        this.createReferences();
    }

    _createClass(NN, [{
        key: "networkPreInit",
        value: function networkPreInit() {
            this.initCore();
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.config.layers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var layer = _step.value;

                    this.createLayer(layer);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: "initCore",
        value: function initCore() {
            this.inputSize = this.config.layers.find(function (l) {
                return l.type === NeuronType.INPUT;
            }).size;
            this.hiddenSize = this.config.layers.find(function (l) {
                return l.type === NeuronType.HIDDEN;
            }).size;
            this.outputSize = this.config.layers.find(function (l) {
                return l.type === NeuronType.OUTPUT;
            }).size;

            this.network = [];
        }
    }, {
        key: "createLayer",
        value: function createLayer(layer) {
            for (var i = 0; i < layer.size; i++) {
                this.network.push(new Neuron(layer.type, i));
            }
        }
    }, {
        key: "createReferences",
        value: function createReferences() {
            this.references = [];

            for (var h = 0; h < this.hiddenSize; h++) {

                for (var i = 0; i < this.inputSize; i++) {
                    this.references.push(new Link(LinkType.INPUT_TO_HIDDEN, i, h));
                }for (var o = 0; o < this.outputSize; o++) {
                    this.references.push(new Link(LinkType.HIDDEN_TO_OUTPUT, h, o));
                }
            }
        }
    }, {
        key: "computeNeuronsValue",
        value: function computeNeuronsValue(neuronType, linkType, fn, print) {
            var _this = this;

            return this.network.filter(function (h) {
                return h.type === neuronType;
            }).forEach(function (h) {
                h.computeValue(_this.references.filter(function (r) {
                    return r.type === linkType && r.neuronToKey === h.key;
                }).reduce(function (prev, curr) {
                    return prev + curr.weight * fn(curr);
                }, 0) + h.bias);

                if (neuronType === NeuronType.OUTPUT) if (print) print(h.getValue());
                //this.outputValue = h.getValue();
            });
        }
    }, {
        key: "computeGlobalError",
        value: function computeGlobalError(derivativeFunc) {
            var _this2 = this;

            this.network.filter(function (n) {
                return n.type === NeuronType.OUTPUT;
            }).forEach(function (o) {
                _this2.error = derivativeFn(o.getValue()) * (derivativeFunc(o) - o.getValue());
                o.setError(_this2.error);
                _this2.computeHiddenErrors(o);
            });
        }
    }, {
        key: "computeHiddenErrors",
        value: function computeHiddenErrors(o) {
            var _this3 = this;

            this.references.filter(function (r) {
                return r.type === LinkType.HIDDEN_TO_OUTPUT && r.neuronToKey === o.key;
            }).forEach(function (ref) {
                var hiddenNeuron = _this3.network.find(function (n) {
                    return n.type === NeuronType.HIDDEN && n.key === ref.neuronFromKey;
                });
                var newWeight = ref.getWeight() + o.error * hiddenNeuron.value;
                ref.setWeight(newWeight);
                hiddenNeuron.setError(derivativeFn(hiddenNeuron.getValue()) * o.error * newWeight);
            });
        }
    }, {
        key: "adjustInputs",
        value: function adjustInputs(derivativeFunc) {
            var _this4 = this;

            this.network.filter(function (h) {
                return h.type === NeuronType.HIDDEN;
            }).forEach(function (h) {
                _this4.references.filter(function (r) {
                    return r.type === LinkType.INPUT_TO_HIDDEN && r.neuronToKey === h.key;
                }).forEach(function (ref) {
                    var newWeight = ref.getWeight() + h.getError() * derivativeFunc(ref);
                    ref.setWeight(newWeight);
                    h.setBias();
                });
            });
        }
    }, {
        key: "trainNetwork",
        value: function trainNetwork(trainInputs, trainAnswers, fn) {
            var _this5 = this;

            console.log('TRAIN START');
            this.prevError = 2;
            this.error = 1;

            this.learnCycles = 0;

            while (this.learnCycles < this.config.cycles) {

                this.learnCycles++;

                var _loop = function _loop(randomSet) {

                    _this5.computeNeuronsValue(NeuronType.HIDDEN, LinkType.INPUT_TO_HIDDEN, function (curr) {
                        return trainInputs[randomSet][curr.neuronFromKey];
                    });
                    _this5.computeNeuronsValue(NeuronType.OUTPUT, LinkType.HIDDEN_TO_OUTPUT, function (curr) {
                        return _this5.network.find(function (n) {
                            return n.type === NeuronType.HIDDEN && n.key === curr.neuronFromKey;
                        }).value;
                    });

                    _this5.computeGlobalError(function (o) {
                        return trainAnswers[randomSet][o.key];
                    });
                    _this5.adjustInputs(function (ref) {
                        return trainInputs[randomSet][ref.neuronFromKey];
                    });
                };

                for (var randomSet = 0; randomSet < trainInputs.length; randomSet++) {
                    _loop(randomSet);
                }

                if (this.learnCycles === this.config.cycles) return fn();

                if (this.learnCycles % 1000 === 0) console.log('LEARN CYCLES ', this.learnCycles);
            }
        }
    }, {
        key: "run",
        value: function run(data, outputFn) {
            var _this6 = this;

            var output = [];
            this.computeNeuronsValue(NeuronType.HIDDEN, LinkType.INPUT_TO_HIDDEN, function (ref) {
                return data[ref.neuronFromKey];
            });
            this.computeNeuronsValue(NeuronType.OUTPUT, LinkType.HIDDEN_TO_OUTPUT, function (curr) {
                return _this6.network.find(function (n) {
                    return n.type === NeuronType.HIDDEN && n.key === curr.neuronFromKey;
                }).value;
            }, function (value) {

                output.push(value);
                if (output.length === _this6.outputSize) outputFn(output);
                // console.log('OUT ', value);
            });
        }
    }, {
        key: "networkStringConfiguration",
        value: function networkStringConfiguration() {
            var networkSaveConfig = {
                configuration: this.config,
                network: this.network,
                references: this.references,
                learnCycles: this.learnCycles
            };

            return JSON.stringify(networkSaveConfig);
        }
    }, {
        key: "serializeToFile",
        value: function serializeToFile() {
            (0, _fs.appendFile)("d://network.txt", this.networkStringConfiguration(), function (err) {
                console.log('append err ', err);
            });
        }
    }, {
        key: "deserializeFromFile",
        value: function deserializeFromFile(path) {
            var _this7 = this;

            (0, _fs.readFile)(path, "utf8", function (err, content) {
                if (!err) {
                    _this7.deserializeObj = JSON.parse(content);
                    _this7.config = _this7.deserializeObj.configuration;
                    _this7.network = _this7.deserializeObj.network.map(function (c) {
                        return Neuron.fromConfig(c);
                    });
                    _this7.references = _this7.deserializeObj.references.map(function (c) {
                        return Link.fromConfig(c);
                    });
                    _this7.learnCycles = _this7.deserializeObj.learnCycles;

                    console.log('SUCCESS DESEREALIZING', _this7.learnCycles);
                } else console.log('FAILED DESERIALIZE NETWORK FILE');
            });
        }
    }]);

    return NN;
}();
//# sourceMappingURL=nn.js.map