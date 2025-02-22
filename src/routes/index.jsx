const routeNames = {
    'home': '/',
    'register': '/register',
    'login': '/login',
    'vehicles.index': '/vehicles',
    'vehicles.create': '/vehicles/create',
    'vehicles.edit': '/vehicles/:id/edit',
    'parkings.active': '/parkings/active',
    'parkings.order': '/parkings/order',
    'profile.edit': '/profile',
    'profile.change-password': '/profile/change-password',
};

function route(name, params = {}) {
    let url = routeNames[name];

    Object.keys(params).forEach((key) => {
        url = url.replace(`:${key}`, params[key]);
    });

    return url;
}

export { route };

// "For in" problem: the keys from object's prototype chain properties are iterated, which can be unwanted
// That's why we check if the property iterated from the object argument `params` is actually owned by it or not: we're only interested in the owned ones.

// for (let prop in params) {
//   if (Object.prototype.hasOwnProperty.call(params, prop)) {
//     url = url.replace(`:${prop}`, params[prop])
//   }
// }