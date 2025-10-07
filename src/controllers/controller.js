const express = require('express');
const { Teacher, Discipline, Class, Post } = require('../models');

console.log('Models loaded:', { Teacher, Discipline, Class, Post });

const createTeacher = async (req, res) => {
    try {
        console.log('createTeacher called with body:', req.body);
        const { name, email } = req.body;
        console.log('Extracted data:', { name, email });
        const newTeacher = await Teacher.create({ name, email });
        console.log('Teacher created:', newTeacher);
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
        const { name, disciplineId, description, image, startDate, endDate } = req.body;
        const newClass = await Class.create({ name, disciplineId, description, image, startDate, endDate });
        res.status(201).json(newClass);
    } catch (error) {
        console.error("Error creating class:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const updateClass = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, disciplineId, description, image, startDate, endDate } = req.body;
        const [updated] = await Class.update({ name, disciplineId, description, image, startDate, endDate }, {
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
        const { name, teacherId, description } = req.body;
        const newDiscipline = await Discipline.create({ name, teacherId, description });
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

// ========== POSTS CONTROLLERS ==========

const createPost = async (req, res) => {
    try {
        console.log('createPost called with body:', req.body);
        const { title, content, author } = req.body;
        
        // Validações básicas
        if (!title || !content || !author) {
            return res.status(400).json({ 
                error: "Título, conteúdo e autor são obrigatórios" 
            });
        }
        
        if (title.length < 5) {
            return res.status(400).json({ 
                error: "O título deve ter pelo menos 5 caracteres" 
            });
        }
        
        if (content.length < 20) {
            return res.status(400).json({ 
                error: "O conteúdo deve ter pelo menos 20 caracteres" 
            });
        }
        
        const newPost = await Post.create({ title, content, author });
        console.log('Post created:', newPost);
        res.status(201).json(newPost);
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getAllPosts = async (req, res) => {
    try {
        console.log('getAllPosts called');
        const posts = await Post.findAll({
            order: [['createdAt', 'DESC']]
        });
        console.log('Posts found:', posts.length);
        res.status(200).json(posts);
    } catch (error) {
        console.error("Error getting posts:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('getPostById called with id:', id);
        
        const post = await Post.findOne({ where: { ID: id } });
        
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ error: "Post not found" });
        }
    } catch (error) {
        console.error("Error getting post:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, author } = req.body;
        console.log('updatePost called with id:', id, 'body:', req.body);
        
        // Validações básicas
        if (title && title.length < 5) {
            return res.status(400).json({ 
                error: "O título deve ter pelo menos 5 caracteres" 
            });
        }
        
        if (content && content.length < 20) {
            return res.status(400).json({ 
                error: "O conteúdo deve ter pelo menos 20 caracteres" 
            });
        }
        
        const [updated] = await Post.update(
            { title, content, author }, 
            { where: { ID: id } }
        );
        
        if (updated) {
            const updatedPost = await Post.findOne({ where: { ID: id } });
            res.status(200).json(updatedPost);
        } else {
            res.status(404).json({ error: "Post not found" });
        }
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('deletePost called with id:', id);
        
        const deleted = await Post.destroy({ where: { ID: id } });
        
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Post not found" });
        }
    } catch (error) {
        console.error("Error deleting post:", error);
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
    getDiscipline,
    // Posts functions
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
};

