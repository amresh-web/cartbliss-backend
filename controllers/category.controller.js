const mongoose = require("mongoose");
const { Category, SubCategory } = require("../models/category.model");

const createCategory = async (req, res) => {
  try{
    const {name, code} = req.body;
    const category = new Category({name, code});
    await category.save();
    return res.json({
      status: 201,
      message: "Category created successfully",
      code: category
    })
  } catch(err){
    res.status(500).json({message: err.message});
  }
}

const createSubCategory = async (req, res) => {
  try{
    const {name, code, categoryId} = req.body;
    const subCategory = new SubCategory({name, code,  category: categoryId});
    console.log(subCategory)
    await subCategory.save();
    return res.json({
      status: 201,
      message: "Sub category created successfully",
      code: subCategory
    })
  } catch(err){
    res.status(500).json({message: err.message});
  }
}


const getSubcategoryByCategoryId = async (categoryId) => {
  try{
    const subcategories = await SubCategory.find({category: categoryId});
    console.log(subcategories);
  }catch(err){
    console.error('Failed to fetch subcategories:', err);
    throw err;
  }
}

module.exports = {createCategory, createSubCategory, getSubcategoryByCategoryId}