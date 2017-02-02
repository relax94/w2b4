"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var Neuron = exports.Neuron = function () {
    function Neuron() {
        var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NeuronType.NONE;
        var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

        _classCallCheck(this, Neuron);

        this.type = type;
        this.value = 0.0;
        this.key = key;
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
        }
    }, {
        key: "getError",
        value: function getError() {
            return this.error;
        }
    }]);

    return Neuron;
}();

var Link = exports.Link = function () {
    function Link() {
        var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : LinkType.NONE;
        var neuronFromKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
        var neuronToKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;

        _classCallCheck(this, Link);

        this.type = type;
        this.neuronFromKey = neuronFromKey;
        this.neuronToKey = neuronToKey;
        this.generateWeight();
        this.deltaWeight = 0.0;
        this.prevDeltaWeight = 0.0;
    }

    _createClass(Link, [{
        key: "generateWeight",
        value: function generateWeight() {
            this.weight = Math.floor(Math.random() * (0.5 - 0) + 0);
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
    }]);

    return Link;
}();

var NN = exports.NN = function () {
    function NN(networkConfiguration) {
        _classCallCheck(this, NN);

        this.config = networkConfiguration;
        this.B = 0.8;
        this.L = 0.9;

        this.networkPreInit();
        this.createReferences();
        this.trainNetwork({});
    }

    _createClass(NN, [{
        key: "networkPreInit",
        value: function networkPreInit() {
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
        key: "trainNetwork",
        value: function trainNetwork(trainConfig) {
            var _this = this;

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

            var trainInputs = [[1, 1, 1], [0, 0, 0], [1, 0, 0], [0, 1, 0]];

            var randomSet = -1;

            this.prevError = 2;
            this.error = 1;

            this.learnCycles = 0;
            this.learnHash = { 0: 0, 1: 0, 2: 0, 3: 0 };

            while (this.learnCycles < 2000) {

                this.learnCycles++;
                for (var rnd = 0; rnd < trainInputs.length; rnd++) {
                    randomSet = rnd;
                    this.learnHash[randomSet]++;

                    this.prevError = this.error;

                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        var _loop = function _loop() {
                            var h = _step2.value;

                            var refs = _this.references.filter(function (r) {
                                return r.type === LinkType.INPUT_TO_HIDDEN && r.neuronToKey === h.key;
                            });
                            var value = 0;
                            var _iteratorNormalCompletion5 = true;
                            var _didIteratorError5 = false;
                            var _iteratorError5 = undefined;

                            try {
                                for (var _iterator5 = refs[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                    var ref = _step5.value;

                                    value += ref.weight * trainInputs[randomSet][ref.neuronFromKey];
                                }
                            } catch (err) {
                                _didIteratorError5 = true;
                                _iteratorError5 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                        _iterator5.return();
                                    }
                                } finally {
                                    if (_didIteratorError5) {
                                        throw _iteratorError5;
                                    }
                                }
                            }

                            h.computeValue(value);
                        };

                        for (var _iterator2 = this.network.filter(function (h) {
                            return h.type === NeuronType.HIDDEN;
                        })[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            _loop();
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }

                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                        var _loop2 = function _loop2() {
                            var o = _step3.value;

                            var refs = _this.references.filter(function (r) {
                                return r.type === LinkType.HIDDEN_TO_OUTPUT && r.neuronToKey === o.key;
                            });
                            var value = 0;
                            var _iteratorNormalCompletion6 = true;
                            var _didIteratorError6 = false;
                            var _iteratorError6 = undefined;

                            try {
                                var _loop3 = function _loop3() {
                                    var ref = _step6.value;

                                    value += ref.weight * _this.network.find(function (n) {
                                        return n.type === NeuronType.HIDDEN && n.key === ref.neuronFromKey;
                                    }).value;
                                };

                                for (var _iterator6 = refs[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                                    _loop3();
                                }
                            } catch (err) {
                                _didIteratorError6 = true;
                                _iteratorError6 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                                        _iterator6.return();
                                    }
                                } finally {
                                    if (_didIteratorError6) {
                                        throw _iteratorError6;
                                    }
                                }
                            }

                            o.computeValue(value);

                            if (_this.learnCycles > 1800) console.log(o.getValue());

                            _this.error = o.getValue() * (1 - o.getValue()) * (trainInputs[randomSet][2] - o.getValue());

                            var _iteratorNormalCompletion7 = true;
                            var _didIteratorError7 = false;
                            var _iteratorError7 = undefined;

                            try {
                                var _loop4 = function _loop4() {
                                    var ref = _step7.value;

                                    var hiddenNeuron = _this.network.find(function (n) {
                                        return n.type === NeuronType.HIDDEN && n.key === ref.neuronFromKey;
                                    });
                                    ref.setDeltaWeight(_this.B * _this.error * hiddenNeuron.value);
                                    var newWeight = ref.getWeight() + ref.getDeltaWeight() + _this.L * ref.getPrevDeltaWeight();
                                    ref.setWeight(newWeight);

                                    hiddenNeuron.setError(_this.error * newWeight);
                                };

                                for (var _iterator7 = refs[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                                    _loop4();
                                }
                            } catch (err) {
                                _didIteratorError7 = true;
                                _iteratorError7 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion7 && _iterator7.return) {
                                        _iterator7.return();
                                    }
                                } finally {
                                    if (_didIteratorError7) {
                                        throw _iteratorError7;
                                    }
                                }
                            }
                        };

                        for (var _iterator3 = this.network.filter(function (o) {
                            return o.type === NeuronType.OUTPUT;
                        })[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            _loop2();
                        }
                    } catch (err) {
                        _didIteratorError3 = true;
                        _iteratorError3 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                _iterator3.return();
                            }
                        } finally {
                            if (_didIteratorError3) {
                                throw _iteratorError3;
                            }
                        }
                    }

                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;

                    try {
                        var _loop5 = function _loop5() {
                            var h = _step4.value;

                            var refs = _this.references.filter(function (r) {
                                return r.type === LinkType.INPUT_TO_HIDDEN && r.neuronToKey === h.key;
                            });
                            var _iteratorNormalCompletion8 = true;
                            var _didIteratorError8 = false;
                            var _iteratorError8 = undefined;

                            try {
                                for (var _iterator8 = refs[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                                    var _ref = _step8.value;

                                    // let inputNeuron = this.network.find(n => n.type === NeuronType.INPUT && n.key === ref.neuronFromKey);
                                    // ref.setDeltaWeight(this.B * h.getError() * inputNeuron.getValue());
                                    _ref.setDeltaWeight(_this.B * h.getError() * trainInputs[randomSet][_ref.neuronFromKey]);
                                    var newWeight = _ref.getWeight() + _ref.getDeltaWeight() + _this.L * _ref.getPrevDeltaWeight();;
                                    _ref.setWeight(newWeight);
                                }
                            } catch (err) {
                                _didIteratorError8 = true;
                                _iteratorError8 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion8 && _iterator8.return) {
                                        _iterator8.return();
                                    }
                                } finally {
                                    if (_didIteratorError8) {
                                        throw _iteratorError8;
                                    }
                                }
                            }
                        };

                        for (var _iterator4 = this.network.filter(function (h) {
                            return h.type === NeuronType.HIDDEN;
                        })[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            _loop5();
                        }
                    } catch (err) {
                        _didIteratorError4 = true;
                        _iteratorError4 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                _iterator4.return();
                            }
                        } finally {
                            if (_didIteratorError4) {
                                throw _iteratorError4;
                            }
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
    }, {
        key: "run",
        value: function run(data) {
            var _this2 = this;

            var _iteratorNormalCompletion9 = true;
            var _didIteratorError9 = false;
            var _iteratorError9 = undefined;

            try {
                var _loop6 = function _loop6() {
                    var h = _step9.value;

                    var refs = _this2.references.filter(function (r) {
                        return r.type === LinkType.INPUT_TO_HIDDEN && r.neuronToKey === h.key;
                    });
                    var value = 0;
                    var _iteratorNormalCompletion11 = true;
                    var _didIteratorError11 = false;
                    var _iteratorError11 = undefined;

                    try {
                        for (var _iterator11 = refs[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                            var _ref2 = _step11.value;

                            // value += ref.weight * this.network.find(n => n.type === NeuronType.INPUT && n.key === ref.neuronFromKey).value;
                            value += _ref2.weight * data[_ref2.neuronFromKey];
                        }
                    } catch (err) {
                        _didIteratorError11 = true;
                        _iteratorError11 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion11 && _iterator11.return) {
                                _iterator11.return();
                            }
                        } finally {
                            if (_didIteratorError11) {
                                throw _iteratorError11;
                            }
                        }
                    }

                    h.computeValue(value);
                };

                for (var _iterator9 = this.network.filter(function (h) {
                    return h.type === NeuronType.HIDDEN;
                })[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                    _loop6();
                }
            } catch (err) {
                _didIteratorError9 = true;
                _iteratorError9 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion9 && _iterator9.return) {
                        _iterator9.return();
                    }
                } finally {
                    if (_didIteratorError9) {
                        throw _iteratorError9;
                    }
                }
            }

            var _iteratorNormalCompletion10 = true;
            var _didIteratorError10 = false;
            var _iteratorError10 = undefined;

            try {
                var _loop7 = function _loop7() {
                    var o = _step10.value;

                    var refs = _this2.references.filter(function (r) {
                        return r.type === LinkType.HIDDEN_TO_OUTPUT && r.neuronToKey === o.key;
                    });
                    var value = 0;
                    var _iteratorNormalCompletion12 = true;
                    var _didIteratorError12 = false;
                    var _iteratorError12 = undefined;

                    try {
                        var _loop8 = function _loop8() {
                            var ref = _step12.value;

                            value += ref.weight * _this2.network.find(function (n) {
                                return n.type === NeuronType.HIDDEN && n.key === ref.neuronFromKey;
                            }).value;
                        };

                        for (var _iterator12 = refs[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                            _loop8();
                        }
                    } catch (err) {
                        _didIteratorError12 = true;
                        _iteratorError12 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion12 && _iterator12.return) {
                                _iterator12.return();
                            }
                        } finally {
                            if (_didIteratorError12) {
                                throw _iteratorError12;
                            }
                        }
                    }

                    o.computeValue(value);
                    console.log("RUN RESULT " + data[0] + " & " + data[1] + " ->  " + o.getValue());
                };

                for (var _iterator10 = this.network.filter(function (o) {
                    return o.type === NeuronType.OUTPUT;
                })[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                    _loop7();
                }
            } catch (err) {
                _didIteratorError10 = true;
                _iteratorError10 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion10 && _iterator10.return) {
                        _iterator10.return();
                    }
                } finally {
                    if (_didIteratorError10) {
                        throw _iteratorError10;
                    }
                }
            }
        }
    }]);

    return NN;
}();

var N = new NN({
    layers: [{
        type: NeuronType.INPUT,
        size: 2
    }, {
        type: NeuronType.HIDDEN,
        size: 3
    }, {
        type: NeuronType.OUTPUT,
        size: 1
    }]
});