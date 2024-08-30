module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    const logGroupName = process.env.CLOUDWATCH_GROUP_NAME;
    const logStreamName = process.env.CLOUDWATCH_STREAM_NAME;

    const AWS = require("aws-sdk");
    AWS.config.update({
      accessKeyId: process.env.CLOUDWATCH_ACCESS_KEY,
      secretAccessKey: process.env.CLOUDWATCH_SECRET_KEY,
      region: process.env.CLOUDWATCH_REGION,
    });

    const cloundWatchLogs = new AWS.CloudWatchLogs();

    const createLogGroupAndStream = async (logGroupName, logStreamName) => {
      try {
        const describeLogGroupParams = {
          logGroupNamePrefix: logGroupName,
        };
        const logGroups = await cloundWatchLogs
          .describeLogGroups(describeLogGroupParams)
          .promise();
        const logGroupExist = logGroups.logGroups.some(
          (group) => group.logGroupName === logGroupName
        );
        if (!logGroupExist) {
          const createLogGroupParams = {
            logGroupName,
          };
          await cloundWatchLogs.createLogGroup(createLogGroupParams).promise();
          console.log("Group create successfully");
        } else {
          console.log("Group already exist");
        }

        const describeLogStreamParams = {
          logGroupName,
          logStreamNamePrefix: logStreamName,
        };

        const logStreams = await cloundWatchLogs
          .describeLogStreams(describeLogStreamParams)
          .promise();
        const logStreamExists = logStreams.logStreams.some(
          (stream) => stream.logStreamName === logStreamName
        );
        if (!logStreamExists) {
          const createLogsStreamParams = {
            logGroupName,
            logStreamName,
          };
          await cloundWatchLogs
            .createLogStream(createLogsStreamParams)
            .promise();
          console.log("Stream created succesfully");
        } else {
          console.log("Stream already exists");
        }
      } catch (error) {
        console.error("Error creating log group and stream: ", error);
      }
    };

    const putLogEvents = async (logGroupName, logStreamName, message) => {
      try {
        createLogGroupAndStream(logGroupName, logStreamName);
        const params = {
          logGroupName,
          logStreamName,
          logEvents: [
            {
              message,
              timestamp: new Date().getTime(),
            },
          ],
        };

        await cloundWatchLogs.putLogEvents(params).promise();
        console.log("Log sent to CloudWatch");
      } catch (error) {
        console.error("Error sending log");
      }
    };

    // await createLogGroupAndStream(logGroupName, logStreamName);
    try {
      //putLogEvents(logGroupName, logStreamName, "Test from strapi");
      await next();
      //putLogEvents(logGroupName, logStreamName, 'Test v2 from strapi');
    } catch (error) {
      putLogEvents(logGroupName, logStreamName, error);
      throw error;
    }
  };
};
