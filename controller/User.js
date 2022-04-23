const userModel = require('../model/User');
const response = require('../config/response');
const bcrypt = require('bcrypt');
const { commonResult } = require('../config/response');

exports.registrasi = (data) =>
new Promise((resolve, reject) => {
    userModel.findOne({userName: data.userName})
            .then(user => {
                if (user) {
                    console.log(user);
                    resolve('Username sudah terdaftar');
                } else {
                    bcrypt.hash(data.password, 10, (err, hash) => {
                        if (err) {
                            reject(response.commonErrorMessage('Gagal membuat password'));
                        } else {
                            data.password = hash;
                            userModel.create(data)
                                .then(result => resolve(response.commonSuccessMessage('Berhasil membuat user')))
                                .catch(err => reject(response.commonErrorMessage('Gagal membuat user')));
                        }
                    });
                }
            }).catch(err => reject(response.commonErrorMessage('Gagal membuat user')));
    });


    exports.login = (data) =>
        new Promise((resolve, reject) => {
            userModel.findOne({userName: data.userName})
                .then(user => {
                    if (!user) {
                        resolve(response.commonErrorMessage('Username tidak terdaftar'));
                    } else {
                        bcrypt.compare(data.password, user.password, (err, result) => {
                            if (err) {
                                reject(response.commonErrorMessage('Gagal membuat password'));
                            } else if (result) {
                                resolve(response.commonSuccessMessage(commonResult(user)));
                            } else {
                                resolve(response.commonErrorMessage('Password salah'));
                            }
                        });
                    }
                })
                .catch(err => reject(response.commonErrorMessage('Gagal membuat user')));
        });

    // exports.login = (data) =>
    //     new Promise((resolve, reject) => {
    //         userModel.findOne({userName: data.userName})
    //             .then(user => {
    //                 if (user) {
    //                     if (bcrypt.compareSync(data.password, user.password)) {
    //                         resolve(response.commonResult(user));
    //                     }
    //                     else {
    //                         reject(response.commonErrorMessage('Password salah'));
    //                 }
    //             } else {
    //                 reject(response.commonErrorMessage('Username tidak terdaftar'));
    //             }})
    //     });
