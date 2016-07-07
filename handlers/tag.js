var mongoose = require('mongoose');
var Module = function (models) {
    'use strict';

    var TagsSchema = mongoose.Schemas.Tags;

    this.getForDd = function (req, res, next) {
        var Tag = models.get(req.session.lastDb, 'tags', TagsSchema);

        Tag
            .find()
            .sort({text: 1})
            .lean()
            .exec(function (err, terms) {
                if (err) {
                    return next(err);
                }

                res.status(200).send({data: terms});
            });
    };

    this.getForList = function (req, res, next) {
        var Tag = models.get(req.session.lastDb, 'tags', TagsSchema);

        Tag
            .find()
            .sort({text: 1})
            .exec(function (err, methods) {
                if (err) {
                    return next(err);
                }

                res.status(200).send(methods);
            });
    };

    this.update = function (req, res, next) {
        var Tag = models.get(req.session.lastDb, 'tags', TagsSchema);
        var body = req.body;
        var id = req.params.id;

        Tag.findByIdAndUpdate(id, body, function (err, method) {
            if (err) {
                return next(err);
            }

            res.status(200).send(method);
        });
    };

    this.create = function (req, res, next) {
        var Tag = models.get(req.session.lastDb, 'tags', TagsSchema);
        var body = req.body;

        var payment = new Tag(body);

        payment.save(function (err, method) {
            if (err) {
                return next(err);
            }

            res.status(200).send(method);
        });
    };

    this.remove = function (req, res, next) {
        var Tag = models.get(req.session.lastDb, 'tags', TagsSchema);
        var id = req.params.id;

        Tag.findByIdAndRemove(id, function (err, method) {
            if (err) {
                return next(err);
            }

            res.status(200).send(method);
        });
    };

};

module.exports = Module;
