const {WebhookClient} = require('dialogflow-fulfillment');

const mongoose = require('mongoose');
const dem = require("../models/Demand");

const Demand = mongoose.model('demand');


module.exports = app => {
    app.post('/', async (req, res) => {
        const agent = new WebhookClient({ request: req, response: res });

        function react(agent) {
            agent.add(`Welcome to my react fulfillment!`);
        }

        function learn(agent) {
            Demand.findOne({'course': agent.parameters.courses}, function(err, course) {
                if (course !== null ) {
                    course.counter++;
                    course.save();
                } else {
                    const demand = new Demand({course: agent.parameters.courses});
                    demand.save();
                }
            });
            let responseText = `You want to learn about ${agent.parameters.courses}. 
            Here is a link to all of my courses: https://www.udemy.com/user/jana-bergant`;
            agent.add(responseText);
        }

        function fallback(agent) {
            agent.add(`I didn't understand`);
            agent.add(`I'm sorry, can you try again?`);
        }
        let intentMap = new Map();
        intentMap.set('react', react);
        intentMap.set('learn courses', learn);
        intentMap.set('Default Fallback Intent', fallback);

        agent.handleRequest(intentMap);
    });

}