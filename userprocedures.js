var fs = require('fs');
var path = require('path');
var jsonPath = path.join(__dirname, 'data.json');

function insertUser(chirp) {
    return new Promise(function(resolve, reject) {
        fs.readFile(jsonPath, 'utf-8', function(err, file) {
            if (err) {
                reject('Error reading data.json');
            }

            var parsed = JSON.parse(file);

            parsed.push(chirp);

            fs.writeFile(jsonPath, JSON.stringify(parsed), function(err) {
                if (err) {
                    reject('Error writing to data.json');
                }

                resolve('Created');
            });
        });
    });
}

function getUsers() {
    return new Promise(function(resolve, reject) {
        fs.readFile(jsonPath, 'utf-8', function(err, file) {
            if (err) {
                reject('Error reading data.json');
            }

            resolve(JSON.parse(file));
        });
    });
}

function updateUser(chirp) {
    return new Promise(function(resolve, reject) {
        fs.readFile(jsonPath, 'utf-8', function(err, file) {
            if (err) {
                reject('Error reading data.json');
            }

            var parsed = JSON.parse(file),
                isFound = false;

            parsed.forEach(function(element) {
                if (element.id === chirp.id) {
                    isFound = true;
                    element.user = chirp.user;
                    element.message = chirp.message;
                }
            });

            if (isFound) {
                fs.writeFile(jsonPath, JSON.stringify(parsed), function(err) {
                    if (err) {
                        reject('Error writing to data.json');
                    }

                    resolve('Updated');
                })
            }
        });
    });
}

function getUser(user) {
    return new Promise(function(resolve, reject) {
        fs.readFile(jsonPath, 'utf-8', function(err, file) {
            if (err) {
                reject('Error reading data.json');
            }

            var parsed = JSON.parse(file),
                found;

            parsed.forEach(function(element) {
                if (element.user === user) {
                    found = element;
                    
                }
            });

            if (!!found) {
                resolve(found);
            } else {
                reject('Not Found');
            }
        });
    });
}

function deleteUser(id) {
    return new Promise(function(resolve, reject) {
        fs.readFile(jsonPath, 'utf-8', function(err, file) {
            if (err) {
                reject('Error reading data.json');
            }

            var parsed = JSON.parse(file),
                isDeleted = false,
                deleteIndex;

            parsed.forEach(function(element, i) {
                if (element.id === id) {
                    isDeleted = true;
                    deleteIndex = i;
                }
            });

            if (isDeleted) {
                parsed.splice(deleteIndex, 1);

                fs.writeFile(jsonPath, JSON.stringify(parsed), function(err) {
                    if (err) {
                        reject('Error writing to data.json');
                    }

                    resolve('Deleted');
                });
            } else {
                reject('Not Found');
            }
        });
    });
}

module.exports = {
    create: insertUser,
    all: getUsers,
    read: getUser,
    destroy: deleteUser,
    update: updateUser
};