import mongoose from "mongoose";

const PlansForLibrarian = new mongoose.Schema(
    {
      LPName: {
        type: String,
      },
      LPDuration: {
        type: String,
      },
      LPCost: {
        type: Number, 
      },    
    },
    { timestamps: true } // Add the timestamps option to automatically create createdAt and updatedAt fields
  );
  

const LibrarianPlan = new mongoose.model("LibrarianPlan", PlansForLibrarian);
module.exports = LibrarianPlan;
