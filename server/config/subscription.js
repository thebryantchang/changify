const AccessControl = require('accesscontrol')

const allRights = {
    'create:any':['*'],
    'read:any':['*'],
    'update:any':['*'],
    'delete:any':['*']
}

let grantsObject = {
    Premium:{
        profile:allRights,
        categories:allRights
    },
    Free:{
        profile:{
            'read:own':['*','!_id','!password'],
            'update:own':['*','!_id','!password']
        }
    }
}

const subscriptions = new AccessControl(grantsObject)

module.exports = {subscriptions}