import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {

  try {
    const { companyName } = req.body;

    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false
      });
    }

    let company = await Company.findOne({ name: companyName });

    if (company) {
      return res.status(400).json({
        message: "you can't add same company",
        success: false
      })
    }

    company = await Company.create({
      name: companyName,
      userId: req.id,
    })

    return res.status(201).json({
      message: "company registered successfully",
      company,
      success: true
    })

  } catch (error) {
    console.log(error);


  }


}


export const getCompany = async (req, res) => {
  try {
    const userId = req.id;   //loggedIn user
    const companies = await Company.find({ userId }); //it will give array of company
    if (!companies) {
      return res.status(404).json({
        message: "Companies not found",
        success: false
      })

    }

    return res.status(201).json({
      message: "these are the companies",
      companies,
      success: true
    })

  } catch (error) {
    console.log(error);

  }
}

//get company by ID

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;

    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false
      })

    }

    return res.status(201).json({
      message: "Company found",
      company,
      success: true
    })


  }
  catch (error) {

  }
}


export const updateCompany = async (req, res) => {
  try {

    const { name, website, description, location } = req.body;
    const file = req.file;
    //cloudinary

    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const logo = cloudResponse.secure_url;

    const updateData = { name, description, website, location, logo };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true })

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false
      });

    }

    return res.status(201).json({
      message: "Company information updated successfully",
      company,
      success: true
    })

  } catch (error) {
    console.log(error);

  }
}