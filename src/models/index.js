const Teacher = require('./Teacher');
const Discipline = require('./Discipline');
const Class = require('./Class');

// Definindo associações
Teacher.hasMany(Discipline, { 
    foreignKey: 'teacherId', 
    as: 'disciplines' 
});

Discipline.belongsTo(Teacher, { 
    foreignKey: 'teacherId', 
    as: 'teacher' 
});

Discipline.hasMany(Class, { 
    foreignKey: 'disciplineId', 
    as: 'classes' 
});

Class.belongsTo(Discipline, { 
    foreignKey: 'disciplineId', 
    as: 'discipline' 
});

module.exports = {
    Teacher,
    Discipline,
    Class
};
