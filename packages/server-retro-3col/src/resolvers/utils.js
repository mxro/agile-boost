
const extractDoc = (obj) => {
    return {
        ...obj._dod,
        _id: obj.id
    }
}

const fixDates = (obj) => {
    return {
        ...obj,
        createdAt: dateToString(obj.createdAt),
        updatedAt: dateToString(obj.updatedAt)
    }
}

export default {
    fixId, fixDates
};