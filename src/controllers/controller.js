const express = require('express');
const { Teacher, Discipline, Class } = require('../models');

const createTeacher = async (req, res) => {
    try {
        const { name, email } = req.body;
        const newTeacher = await Teacher.create({ name, email });
        res.status(201).json(newTeacher);
    } catch (error) {
        console.error("Error creating teacher:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const updateTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        const [updated] = await Teacher.update({ name, email }, {
            where: { ID: id }
        });
        if (updated) {
            const updatedTeacher = await Teacher.findOne({ where: { ID: id } });
            res.status(200).json(updatedTeacher);
        } else {
            res.status(404).json({ error: "Teacher not found" });
        }
    } catch (error) {
        console.error("Error updating teacher:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const deleteTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Teacher.destroy({ where: { ID: id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Teacher not found" });
        }
    } catch (error) {
        console.error("Error deleting teacher:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const teacher = await Teacher.findOne({ where: { ID: id } });
        if (teacher) {
            res.status(200).json(teacher);
        } else {
            res.status(404).json({ error: "Teacher not found" });
        }
    } catch (error) {
        console.error("Error fetching teacher:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const createClass = async (req, res) => {
    try {
        const { name, disciplineId } = req.body;
        const newClass = await Class.create({ name, disciplineId });
        res.status(201).json(newClass);
    } catch (error) {
        console.error("Error creating class:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const updateClass = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, disciplineId } = req.body;
        const [updated] = await Class.update({ name, disciplineId }, {
            where: { ID: id }
        });
        if (updated) {
            const updatedClass = await Class.findOne({ where: { ID: id } });
            res.status(200).json(updatedClass);
        } else {
            res.status(404).json({ error: "Class not found" });
        }
    } catch (error) {
        console.error("Error updating class:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const deleteClass = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Class.destroy({ where: { ID: id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Class not found" });
        }
    } catch (error) {
        console.error("Error deleting class:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getClass = async (req, res) => {
    try {
        const { id } = req.params;
        const classItem = await Class.findOne({ 
            where: { ID: id },
            include: [
                { model: Discipline, as: 'discipline' }
            ]
        });
        if (classItem) {
            res.status(200).json(classItem);
        } else {
            res.status(404).json({ error: "Class not found" });
        }
    } catch (error) {
        console.error("Error fetching class:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getAllClasses = async (req, res) => {
    try {
        const classes = await Class.findAll();
        res.status(200).json(classes);
    } catch (error) {
        console.error("Error fetching all classes:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const createDiscipline = async (req, res) => {
    try {
        const { name, description} = req.body;
        const newDiscipline = await Discipline.create({ name, description });
        res.status(201).json(newDiscipline);
    } catch (error) {
        console.error("Error creating discipline:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const updateDiscipline = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const [updated] = await Discipline.update({ name, description }, {
            where: { ID: id }
        });
        if (updated) {
            const updatedDiscipline = await Discipline.findOne({ where: { ID: id } });
            res.status(200).json(updatedDiscipline);
        } else {
            res.status(404).json({ error: "Discipline not found" });
        }
    } catch (error) {
        console.error("Error updating discipline:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const deleteDiscipline = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Discipline.destroy({ where: { ID: id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Discipline not found" });
        }
    } catch (error) {
        console.error("Error deleting discipline:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getDiscipline = async (req, res) => {
    try {
        const { id } = req.params;
        const discipline = await Discipline.findOne({ where: { ID: id } });
        if (discipline) {
            res.status(200).json(discipline);
        } else {
            res.status(404).json({ error: "Discipline not found" });
        }
    } catch (error) {
        console.error("Error fetching discipline:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    createTeacher,
    updateTeacher,
    deleteTeacher,
    getTeacher,
    createClass,
    updateClass,
    deleteClass,
    getClass,
    getAllClasses,
    createDiscipline,
    updateDiscipline,
    deleteDiscipline,
    getDiscipline
};

