import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({
        message: "Job Id is required",
        success: false
      })
    }

    //check if the user already applied for the job
    const existingApplication = await Application.findOne({ job: jobId, applicant: userId })

    if (existingApplication) {
      return res.status(400).json({
        message: "you have already applied for the job",
        success: false
      })
    }

    //check if the job exists

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false
      })

    }

    //create new application

    const newApplication = await Application.create({
      job: jobId,
      applicant: userId
    })

    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json({
      message: "applicant applied successfully",
      newApplication,
      success: false
    })


  }
  catch (error) {
    console.log(error);


  }
}
//for students to get all jobs whom they applied earlier
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
      path: 'job',
      options: { sort: { crearedAt: -1 } },
      populate: {
        path: 'company',
        options: { sort: { createdAt: -1 } },

      }

    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        success: false
      })

    }

    return res.status(201).json({
      application,
      success: true
    })



  } catch (error) {

    console.log(error);
  }
}

//for admin to check how many users apply for the job
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: 'applications',
      options: { sort: { crearedAt: -1 } },
      populate: {
        path: 'applicant'
      }

    })
    if (!job) {
      return res.status(404).json({
        message: "job not found",
        success: false
      })

    }

    return res.status(201).json({
      job,
      success: true
    })


  }
  catch (error) {
    console.log(error);

  }
}

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(404).json({
        message: "status is required",
        success: false
      })
    }
    //find the application by application id

    const application = await Application.findOne({ _id: applicationId });

    if (!application) {
      return res.status(404).json({
        message: "application not found",
        success: false
      })

    }
    //update the status
    application.status = status.toLowerCase();
    await application.save();

    return res.status(201).json({
      message: "status updated successfully",
      success: true
    })



  } catch (error) {

  }
}