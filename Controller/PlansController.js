import AdminPlanModel from "../Model/AdminPlanModel ";
import LibraryPlanModel from "../Model/LibraryPlanModel";
import ErrorResponse from "../utils/Error-Utils";

export const FetchAdminPlans = async (req, res) => {
  let result = await AdminPlanModel.find();
  console.log(result);
  res.json({ result });
};
export const SingleAdminPlans = async (req, res) => {
  console.log(req.query);
  let result = await AdminPlanModel.findById({ _id: req.query.planId });
  res.json({ result });
};

export const ADDAdminPlans = async (req, res) => {
  try {
    console.log(req.body);
    const {Name,Duration,Amount } = req.body;

    const plans = new AdminPlanModel({
     Name,
     Duration,
     Amount,
    });
    plans
      .save({ timeout: 20000 })
      .then((result) => {
        console.log(`success ${result}`);
        res.json({ success: result });
      })
      .catch((err) => console.log(err), res.json({ failed: err }));
  } catch (error) {
    console.log(error);
  }
};

export const updateSingleAdminPlans = async (req, res) => {
  const { planId } = req.query;
  const { formData } = req.body;
  console.log(req.body);
  const {Name,Duration,Amount } = req.body;

  let result = await AdminPlanModel.findByIdAndUpdate(
    { _id: planId },
    {Name,Duration,Amount }
  );

  if (result) res.json({ success: result });
  else res.json({ failed: result });
};

export const DeleteAdminPlans = async (req, res) => {
  let result = await AdminPlanModel.findByIdAndDelete({
    _id: req.query.planId,
  });
  console.log(`the result ${result}`);
  if (result) res.json({ success: result });
  else res.json({ failed: result });
};

export const FetchLibraryPlans = async (req, res) => {
  let result = await LibraryPlanModel.find();
  console.log(result);
  res.json({ result });
};

export const SingleLibraryPlans = async (req, res) => {
  console.log(req.query);
  let result = await LibraryPlanModel.findById({ _id: req.query.planId });
  res.json({ result });
};

export const ADDLibraryPlans = async (req, res,next) => {
  try {
    console.log(req.body);
    const {Name,Duration,Amount } = req.body;

    const plans = new LibraryPlanModel({
     Name,
     Duration,
     Amount,
    });
    plans
      .save({ timeout: 20000 })
      .then((result) => {
        console.log(`success ${result}`);
        res.json({ success: result });
      })
      .catch((err) => {
        next(ErrorResponse.internalError(err.message.split(": ")[1]));
      });
  } catch (error) {
    next(error);
  }
};

export const updateSingleLibraryPlans = async (req, res) => {
  const { planId } = req.query;
  const { formData } = req.body;
  console.log(req.body);
  const {Name,Duration,Amount } = req.body;

  let result = await LibraryPlanModel.findByIdAndUpdate(
    { _id: planId },
    {Name,Duration,Amount }
  );

  if (result) res.json({ success: result });
  else res.json({ failed: result });
};

export const DeleteLibraryPlans = async (req, res) => {
  let result = await LibraryPlanModel.findByIdAndDelete({
    _id: req.query.planId,
  });
  console.log(`the result ${result}`);
  if (result) res.json({ success: result });
  else res.json({ failed: result });
};
