module.exports = (mongoose) => {
    const undeadSchema = mongoose.Schema({
        name: {
            type: String, unique:true
        },
        image: {
            type: String
        },
        description: {
            type: String
        },
        health_points: {
            type: Number
        },
        item_drop_chance: {
            type: Number
        },
        undead_rating: {
            type: String
        },
        item_drops: {
            type: Array
        }
    });
    return mongoose.model('Undead', undeadSchema, 'Undead');
};