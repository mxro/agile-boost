
const dateToString = date => new Date(date).toISOString();

const extractDoc = (obj) => {
    return {
        ...obj._doc,
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
    extractDoc, fixDates
};