import mongoose from 'mongoose'
mongoose.connect("mongodb://localhost:27017");

let StoreInstance = null;

export class Store {

    constructor() {
        if (!StoreInstance)
            StoreInstance = this;

        this.time = new Date();

        return StoreInstance;
    }

    getTime() {
        return this.time;
    }

    responseWrapper(err, response, fn) {
        if (!err) {
            return fn({ state: true, r: response });
        } else {
            return fn({ state: false, e: err });
        }
    }


    saveInstance(instanceToSave, fn) {
        if (instanceToSave && fn) {
            instanceToSave.save((err, response) => {
                return this.responseWrapper(err, response, fn);
            });
        }
    }

    removeInstance(_model, removeCriteria, fn) {
        if (removeCriteria, fn) {
            return _model.remove(removeCriteria)
                .exec((err, response) => {
                    return this.responseWrapper(err, response, fn);
                });
        }
    }

    //UPDATE INSTANCE (NOT IMPLEMENTED)
    updateInstance() {

    }

    findInstance(_model, findCriteria, fn) {
        if (findCriteria && fn) {
            return _model.findOne(findCriteria)
                .exec((err, response) => {
                    return this.responseWrapper(err, response, fn);
                });
        }
    }


    findInstanceWithSort(_model, findCriteria, sortOptions, fn) {
        return _model.findOne(findCriteria)
            .sort(sortOptions)
            .exec((err, response) => {
                return this.responseWrapper(err, response, fn);
            });
    }

    findInstances(_model, findCriteria, options, fn) {
        if (findCriteria && fn) {
            return _model.find(findCriteria)
                .sort(options)
                .exec((err, response) => {
                    return this.responseWrapper(err, response, fn);
                });
        }
    }


    findInstanceWithPopulate(_model, findCriteria, populateQuery, fn) {
        if (findCriteria && fn) {
            return _model.findOne(findCriteria)
                .populate(populateQuery)
                .exec((err, response) => {
                    return this.responseWrapper(err, response, fn);
                });
        }
    }

    findInstancesWithPopulate(_model, findCriteria, options, populateQuery, fn) {
        if (findCriteria && fn) {
            return _model.find(findCriteria)
                .sort(options)
                .skip(0)
                .limit(5)
                .populate(populateQuery)
                .exec((err, response) => {
                    return this.responseWrapper(err, response, fn);
                });
        }
    }

    externalPopulate(_model, instance, pathName, fn) {
        _model.populate(instance, { path: pathName }, fn);
    }

    saveInstanceWithPopulate(_model, pathName, instanceToSave, fn) {
        if (instanceToSave && fn) {
            instanceToSave.save((err, response) => {
                if (!err && response) {
                    return this.externalPopulate(_model, response, pathName, (err, response) => {
                        return this.responseWrapper(err, response, fn);
                    });
                }
            });
        }
    }

}