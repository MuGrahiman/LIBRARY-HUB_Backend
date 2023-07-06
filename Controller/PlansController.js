import LibrarianPlan from "../Model/LPlanModel";

const FetchLPlans = async (req, res) => {
  let result = await LibrarianPlan.find();
  console.log(result);
  res.json({ result });
};
const SingleLPlans = async (req, res) => {
  console.log(req.query);
  let result = await LibrarianPlan.findById({ _id: req.query.planId });
  res.json({ result });
};

const ADDLPlans = async (req, res) => {
  try {
    console.log(req.body);
    const { LPName, LPDuration, LPCost } = req.body;

    const plans = new LibrarianPlan({
      LPName,
      LPDuration,
      LPCost,
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

const updateSingleLPlans = async (req, res) => {
  const { planId } = req.query;
  const { formData } = req.body;
  console.log(req.body);
  const { LPName, LPDuration, LPCost } = req.body;

  let result = await LibrarianPlan.findByIdAndUpdate(
    { _id: planId },
    { LPName, LPDuration, LPCost }
  );
  
  if (result) res.json({ success: result });
  else res.json({ failed: result });
};

const DeleteLPlans = async (req, res) => {
  let result = await LibrarianPlan.findByIdAndDelete({ _id: req.query.planId });
  console.log(`the result ${result}`);
  if (result) res.json({ success: result });
  else res.json({ failed: result });
};

export {
  FetchLPlans,
  ADDLPlans,
  SingleLPlans,
  updateSingleLPlans,
  DeleteLPlans,
};
