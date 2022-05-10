// @desc    Get all Activities

import { Activity } from "../types/activity.ts";
import { v4 } from "https://deno.land/std@0.137.0/uuid/mod.ts";
import db from "../mongodb.ts";
import { Bson } from "https://deno.land/x/mongo@v0.29.4/mod.ts";

const activitiesCollection = db.collection("activities");

let activities: Activity[] = [
  {
    activity: "Learn how to write in shorthand",
    accessibility: 0.1,
    type: "education",
    participants: 1,
    price: "",
    link: "",
    id: "6778219",
  },
  {
    activity: "Learn how to french braid hair",
    accessibility: 0.1,
    type: "education",
    participants: 1,
    price: "",
    link: "",
    id: "8926492",
  },
  {
    activity: "Compliment someone",
    accessibility: 0.0,
    type: "social",
    participants: 2,
    price: "",
    link: "",
    id: "9149470",
  },
];

// @route   GET /api/v1/activities
const getActivities = async ({ response }: { response: any }) => {
  const activitiesDb = await activitiesCollection.find({}).toArray();
  console.log("total activities: " + activitiesDb.length);
  response.body = {
    success: true,
    data: activitiesDb,
  };
};

// @desc    Get single Activity
// @route   GET /api/v1/activities/:id
const getActivity = async ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  const activity = await activitiesCollection.findOne({
    _id: new Bson.ObjectId(params.id),
  });

  console.log(activity);

  if (activity) {
    response.status = 200;
    response.body = {
      success: true,
      data: activity,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No Activity found",
    };
  }
};

// @desc    Add Activity
// @route   Post /api/v1/activities
const addActivity = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      msg: "No data",
    };
    return;
  }

  const activity: Activity = await request.body().value;

  // insert activity in mongodb
  await activitiesCollection.insertOne(activity);

  response.status = 201;
  response.body = {
    success: true,
    data: activity,
  };
};

// @desc    Update Activity
// @route   PUT /api/v1/activities/:id
const updateActivity = async ({
  params,
  request,
  response,
}: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  if (request.body()) {
    const body = await request.body();
    const updateData = await body.value;

    const modifiedCount = await activitiesCollection.updateOne(
      { _id: new Bson.ObjectId(params.id) },
      {
        $set: {
          ...updateData,
        },
      },
    );

    if (!modifiedCount) {
      response.status = 404;
      response.body = {
        success: false,
        msg: "No Activity found",
      };
    }

    response.status = 200;
    response.body = {
      success: true,
      data: await activitiesCollection.findOne({
        _id: new Bson.ObjectId(params.id),
      }),
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No Activity found",
    };
  }
};

// @desc    Delete Activity
// @route   DELETE /api/v1/activities/:id
const deleteActivity = async (
  { params, response }: { params: { id: string }; response: any },
) => {
  const count = await activitiesCollection.deleteOne({_id: new Bson.ObjectId(params.id)});

  if (!count) {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No activity found"
    }    
  } else {
    response.status = 200;
    response.body = {
      success: true,
      msg: "Activity deleted"
    }
  }
};

export {
  addActivity,
  deleteActivity,
  getActivities,
  getActivity,
  updateActivity,
};
