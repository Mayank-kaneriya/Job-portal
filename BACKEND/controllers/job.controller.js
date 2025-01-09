import create from "prompt-sync";
import { Job } from "../models/job.model.js";
//admin post karega
export const postJob = async (req, res) => {
  try {
    const { title, description, salary, requirements, jobType, location, experience, position, companyId } = req.body;
    const userId = req.id;

    if (!title || !description || !salary || !requirements || !jobType || !location || !experience || !position || !companyId) {
      return res.status(400).json({
        message: "something is mising",
        success: false
      })
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(','),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId

    })

    return res.status(201).json({
      message: "New job created successfully",
      job,
      success: true
    })


  } catch (error) {
    console.log(error);


  }
}
//student ke liye
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } }   // i for not casesensitive
      ]

    };

    const jobs = await Job.find(query).populate({
      path: "company"
    }).sort({ createdAt: -1 });

    if (!jobs) {
      return res.status(404).json({
        message: "Job not found",
        success: false
      })

    }

    return res.status(201).json({
      jobs,
      success: true
    })



  } catch (error) {

  }
}

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications"
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false
      })

    }
    return res.status(201).json({
      job,
      success: true
    })

  } catch (error) {
    console.log(error);

  }
}

//admin kitne job create kiya abhi tak

export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: 'company',
      createdAt: -1
    })

    if (!jobs) {
      return res.status(404).json({
        message: "Job not found",
        success: false
      })

    }
    return res.status(201).json({
      jobs,
      success: true
    })

  } catch (error) {

  }
}