


document.addEventListener('DOMContentLoaded', async () => {
    const pullLeverButton = document.getElementById('pull-lever');
    const doNothingButton = document.getElementById('do-nothing');
    const nextButton = document.getElementById('next');
    const resultsText = document.getElementById('results-text');
    const problemImage = document.querySelector('.problem img');
    const problemText = document.getElementById('problem-text');
    const levelMarker = document.getElementById('level-marker');

    let killCount = 0;


    // Array of trolley problems
    const problems = [
        {
            image: './assets/trolly_problems/trolly_original.jpg',
            question: 'Oh no! A trolley is heading towards 5 people. You can pull the lever to divert it to the other track, killing 1 person instead. What do you do?',
            options: {
                pullLever: 'Pull the lever',
                doNothing: 'Do nothing'
            },
            level: 'The Original',
            killCounts: { pullLever: 1, doNothing: 5 }
        },
        {
            "image": "./assets/trolly_problems/",
            "question": "The trolley is headed towards five people. Pulling the lever will save them but will cause you intense personal suffering. Do you accept fate or take control?",
            "options": {
                "pullLever": "Pull the lever",
                "doNothing": "Do nothing"
            },
            "level": "Personal Suffering",
            killCounts: { pullLever: 0, doNothing: 5 }
        },
        {
            "image": "./assets/trolly_problems/sacrifice.jpg",
            "question": "(ERROR THERE SHOULD BE NO LEVER OPERATOR THE LEVER SHOULD BE RIGHT NEXT TO YOU) The trolley is headed towards a track with five strangers. Pulling the lever will divert it to a track where you, yourself, are tied.",
            "options": {
                "pullLever": "Pull the lever",
                "doNothing": "Do nothing"
            },
            "level": "Personal Sacrifice",
            killCounts: { pullLever: 1, doNothing: 5 }
        },
        {
            "image": "./assets/trolly_problems/genius.jpg",
            "question": "The trolley is headed towards five average people. Pulling the lever will divert it to a renowned scientist who is on the verge of a world-changing breakthrough that will save more than 5 people.",
            "options": {
                "pullLever": "Pull the lever",
                "doNothing": "Do nothing"
            },
            "level": "Genius vs. Average",
            killCounts: { pullLever: 1, doNothing: 5 }
        },
        {
            "image": "./assets/trolly_problems/ai.jpg",
            "question": "The trolley is headed towards a group of advanced AI robots who have developed sentience and feelings. Pulling the lever will divert it to one human.",
            "options": {
                "pullLever": "Pull the lever",
                "doNothing": "Do nothing",
                killCounts: { pullLever: 1, doNothing: 5 }
            },
            "level": "AI Sentience"
        },
        {
            "image": "./assets/trolly_problems/lobotomy.jpg",
            "question": "A trolley is heading towards five people that have been lobotomized. Pulling the lever will divert the track to one person without one.",
            "options": {
                "pullLever": "Pull the lever",
                "doNothing": "Do nothing"
            },
            "level": "Lobotomy for Dummies",
            killCounts: { pullLever: 1, doNothing: 5 }
        },
        {
            "image": "./assets/trolly_problems/clone.jpg",
            "question": "(ERROR CLONES SHOULD BE ON OTHER SIDE) The trolley is headed towards five humans who have clones. Pulling the lever will divert it to their group of clones which are completely indistinguishable from the original humans. Do you value the clones’ lives equally to the original?",
            "options": {
                "pullLever": "Pull the lever",
                "doNothing": "Do nothing"
            },
            "level": "Clone Crisis",
            killCounts: { pullLever: 5, doNothing: 5 }
        },
        {
            "image": "./assets/trolly_problems/matrix.jpg",
            "question": "The trolley is headed towards an empty track. On the other track there is a simulator attached to five people living happily in a simulated reality. Pulling the lever will cause the trolley to hit the simulator and awaken them to a harsher, but real, existence that will expose them to suffering. Is ignorance really bliss or will you show them the truth?",
            "options": {
                "pullLever": "Pull the lever",
                "doNothing": "Do nothing"
            },
            "level": "The Matrix",
            killCounts: { pullLever:0, doNothing: 0 }
        },
        {
            "image": "./assets/trolly_problems/bestfriend.jpg",
            "question": "The train is headed toward your dog. Pull the lever and divert it toward a random person.",
            "options": {
                "pullLever": "Pull the lever",
                "doNothing": "Do nothing"
            },
            "level": "Man’s Best Friend",
            killCounts: { pullLever: 1, doNothing: 5 }
        },
        {
            "image": "./assets/trolly_problems/prank.jpg",
            "question": "The trolley is headed towards an empty track but if you pull the lever it will head towards one person tied to the track. The brakes on this trolley work and no one is going to get hurt regardless of your choice. However, the trolley driver is a bit annoying and you kind of want to prank him.",
            "options": {
                "pullLever": "Pull the lever",
                "doNothing": "Do nothing"
            },
            "level": "Get Pranked",
            killCounts: { pullLever: 0, doNothing: 0 }
        },
        {
            "image": "./assets/trolly_problems/mrbeast.jpg",
            "question": "The trolley is headed toward one person. Do nothing and let that person die or pull the lever and double it and give it to the next person?",
            "options": {
                "pullLever": "Pull the lever",
                "doNothing": "Do nothing"
            },
            "level": "Mr. Beast Trolley",
            killCounts: { pullLever: 2, doNothing: 1 }
        },
        {
            "image": "./assets/trolly_problems/yap.jpg",
            "question": "(REFORMAT QUESTION) Save one person but he will follow you around and never stop talking.",
            "options": {
                "pullLever": "Pull the lever",
                "doNothing": "Do nothing"
            },
            "level": "Yapper",
            killCounts: { pullLever: 0, doNothing: 1 }
        },
        {
            "image": "./assets/trolly_problems/freesolo.jpg",
            "question": "A trolley is headed toward a man standing on the tracks about to fall into a canyon. When he falls he will hit the water and survive with no injuries; however, he will be at the bottom of a 2500 ft canyon. This man is not a rock climber and the only way for him to escape will be to climb. Diverting the tracks will save the man from the immediate death from the train but strand him in this canyon with no food, water, nor any other supplies so he may die of thirst, starvation, or fall damage trying to climb the canyon. Do you let the trolley smash into the individual, killing him immediately, or do you divert the trolley and give the individual a chance to possibly survive, but also potentially endure greater psychological and physical torment?",
            "options": {
                "pullLever": "Pull the lever",
                "doNothing": "Do nothing"
            },
            "level": "Free Solo",
            killCounts: { pullLever: 0, doNothing: 1 }
        },
        {
            "image": "./assets/trolly_problems/oil.jpg",
            "question": "A trolley is headed towards an empty track. However, this trolley is special, it travels the world, synthesizing oil for many countries and emitting significant CO2 emissions in the process. This worsens global warming and its effects which will eventually end in the fall of the human race. If the trolley continues no one will die immediately but the self-destroying trolley behavior is only stoppable by a unanimous G20 summit vote. Pull the lever and five people will die but the trolley will derail and the energy machine will be completely destroyed setting the human race back significantly in available power. Do you risk environmental catastrophe to save five lives now, trusting world governments to intervene later?",
            "options": {
                "pullLever": "Pull the lever",
                "doNothing": "Do nothing"
            },
            "level": "Oil Tycoon Trolley",
            killCounts: { pullLever: 0, doNothing: 0 }
        },
        {
            "image": "./assets/trolly_problems/fate.jpg",
            "question": "(ADD IN LOGIC TO MAKE IT SO THAT IT PULLS UP THE NEXT PROBLEM PROMPT AND LOOPS BACK TO THIS ONE) A trolley is about to hit five people you deeply value. Pulling the lever will make the trolley go in a loop and come back around postponing their death temporarily. You can’t save them. You can only move on from this question when you come to terms with the fact that they must die.",
            "options": {
                "pullLever": "Pull the lever",
                "doNothing": "Do nothing"
            },
            "level": "Fate",
            killCounts: { pullLever: 0, doNothing: 5 }
        },
        {
            "image": "./assets/trolly_problems/reverse.jpg",
            "question": "The trolley has already hit and killed five people. You can pull the lever to rewind time and save them, but this will redirect the trolley to kill one person. Those five also might have been happy in their afterlife and could be very angry you brought them back.",
            "options": {
                "pullLever": "Pull the lever",
                "doNothing": "Do nothing"
            },
            "level": "Reversing Fate",
            killCounts: { pullLever: -4, doNothing: 0 }
        },
        {
            "image": "./assets/trolly_problems/nihilism.jpg",
            "question": "No one is tied down. Both paths lead to the same meaningless future. Knowing you have no power and your actions and existence are entirely pointless leading to the same outcome no matter what, do you pull the lever?",
            "options": {
                "pullLever": "Pull the lever",
                "doNothing": "Do nothing"
            },
            "level": "Nihilist or Absurdist",
            killCounts: { pullLever: 0, doNothing: 0 }
        },
        {
            "image": "./assets/trolly_problems/loop.jpg",
            "question": "There is no moral question or conundrum on the tracks. You can pull the lever but it won’t do anything. You are just waiting to watch the trolley do this sick loop.",
            "options": {
                "pullLever": "Pull the lever",
                "doNothing": "Do nothing"
            },
            "level": "Sick Loop",
            killCounts: { pullLever: 0, doNothing: 0 }
        },
        {
            "image": "./assets/trolly_problems/god.jpg",
            "question": "(CHANGE PICTURE SO THAT SATANS TRACK IS CIRCULAR) The trolley is headed towards a man that you tied to the tracks because of his great-grandfather's actions. You, possessing the power of divine justice, can pull the lever to divert the trolley, spare him, and free him from suffering the wrath of Satan's Trolley. However, you're not sure he has begged enough for forgiveness. Show mercy or let the trolley continuously run over him for eternity?",
            "options": {
                "pullLever": "Pull the lever",
                "doNothing": "Do nothing"
            },
            "level": "Satan’s Trolley",
            killCounts: { pullLever: 0, doNothing: 0 }
        },
        {
            "image": "./assets/trolly_problems/philosopher.jpg",
            "question": "(REDRAW THIS LOOKS LIKE ASS AND THE QUESTION IS INCOMPLETE)The trolley is headed towards a group of five philosophers debating the trolley problem. Pulling the lever will divert it to a single person who believes the question is pointless. Do you spare the one person with common sense or keep the philosophers alive despite their ?",
            "options": {
                "pullLever": "Pull the lever",
                "doNothing": "Do nothing"
            },
            "level": "The Philosopher’s Dilemma",
            killCounts: { pullLever: 1, doNothing: 5 }
        },
        {
            "image": "./assets/trolly_problems/job.jpg",
            "question": "You are a professional trolley problem moral advisor, your job depends on absurd, unrealistic moral questions involving trains. However, lately there has been a lack of trolley problems and nobody is in any danger rendering your skills useless. There is a special lever in front of you that will randomly create a trolly problem and attach people to the rails. Will you pull the lever and tie people to the rails to save your job?",
            "options": {
                "pullLever": "Pull the lever",
                "doNothing": "Do nothing"
            },
            "level": "Job Security",
            killCounts: { pullLever: 0, doNothing: 0 }
        },
        {
            "image": "./assets/trolly_problems/end.jpg",
            "question": "You have finally found the man responsible for creating all of these stupid trolley problems and have tied him on the tracks. Do you pull the lever and save many from the mental anguish of his trolly problems or do nothing and let the ridiculousness continue?",
            "options": {
                "pullLever": "Pull the lever",
                "doNothing": "Do nothing"
            },
            "level": "The End",
            killCounts: { pullLever: 1, doNothing: 0 }
        }
        // Add more problems as needed
    ];

    let currentProblemIndex = 0;

    // const getVotes = (index) => {
    //     const votes = JSON.parse(localStorage.getItem('votes')) || {};
    //     if (!votes[index]) {
    //         votes[index] = { pullLever: 0, doNothing: 0 };
    //     }
    //     return votes;
    // };
    const getVotes = async (index) => {
        const docRef = db.collection("votes").doc(`problem${index}`);
        const docSnap = await docRef.get();
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return { pullLever: 0, doNothing: 0 };
        }
    };

    const updateProblem = async () => {
        const problem = problems[currentProblemIndex];
        problemImage.src = problem.image;
        problemText.textContent = problem.question;
        pullLeverButton.textContent = problem.options.pullLever;
        doNothingButton.textContent = problem.options.doNothing;
        levelMarker.textContent = `Level ${currentProblemIndex + 1}: ${problem.level}`;
        pullLeverButton.style.display = 'inline-block';
        doNothingButton.style.display = 'inline-block';
        nextButton.style.display = 'none';
        resultsText.textContent = '';
        window.scrollTo(0, 0);
        await updateResults();
    };
    
    // const updateResults = () => {
    //     const votes = getVotes(currentProblemIndex);
    //     const currentVotes = votes[currentProblemIndex];
    //     const totalVotes = currentVotes.pullLever + currentVotes.doNothing;
    //     const pullLeverPercentage = totalVotes > 0 ? ((currentVotes.pullLever / totalVotes) * 100).toFixed(1) : 0;
    //     const doNothingPercentage = totalVotes > 0 ? ((currentVotes.doNothing / totalVotes) * 100).toFixed(1) : 0;
    
    //     resultsText.textContent = `Pull the lever: ${currentVotes.pullLever} votes (${pullLeverPercentage}%) | Do nothing: ${currentVotes.doNothing} votes (${doNothingPercentage}%)`;
    // };
    const updateResults = async () => {
        const votes = await getVotes(currentProblemIndex);
        const totalVotes = votes.pullLever + votes.doNothing;
        const pullLeverPercentage = totalVotes > 0 ? ((votes.pullLever / totalVotes) * 100).toFixed(1) : 0;
        const doNothingPercentage = totalVotes > 0 ? ((votes.doNothing / totalVotes) * 100).toFixed(1) : 0;
    
        resultsText.textContent = `Pull the lever: ${votes.pullLever} votes (${pullLeverPercentage}%) | Do nothing: ${votes.doNothing} votes (${doNothingPercentage}%)`;
    };
    
    // const handleVote = (option) => {
    //     const votes = getVotes(currentProblemIndex);
    //     votes[currentProblemIndex][option]++;
    //     localStorage.setItem('votes', JSON.stringify(votes));
    //     updateResults();

    //     killCount += problems[currentProblemIndex].killCounts[option];
    
    //     if (problems[currentProblemIndex].level === 'Fate' && option === 'pullLever') {
    //         // Repeat the "Fate" level
    //         updateProblem();
    //     } else {
    //         pullLeverButton.style.display = 'none';
    //         doNothingButton.style.display = 'none';
    //         nextButton.style.display = 'inline-block';
    //     }
    // };

    const handleVote = async (option) => {
        await updateVotes(currentProblemIndex, option);
        await updateResults();
    
        const incrementBy = problems[currentProblemIndex].killCounts[option];
        killCount += incrementBy;
        await updateKillCount(incrementBy);
    
        if (problems[currentProblemIndex].level === 'Fate' && option === 'pullLever') {
            // Repeat the "Fate" level
            updateProblem();
        } else {
            pullLeverButton.style.display = 'none';
            doNothingButton.style.display = 'none';
            nextButton.style.display = 'inline-block';
        }
    };

    const updateVotes = async (index, option) => {
        const docRef = db.collection("votes").doc(`problem${index}`);
        const docSnap = await docRef.get();
        if (docSnap.exists()) {
            await docRef.update({
                [option]: firebase.firestore.FieldValue.increment(1)
            });
        } else {
            await docRef.set({
                pullLever: option === "pullLever" ? 1 : 0,
                doNothing: option === "doNothing" ? 1 : 0
            });
        }
    };

    const getKillCount = async () => {
        const docRef = db.collection("stats").doc("killCount");
        const docSnap = await docRef.get();
        if (docSnap.exists()) {
            return docSnap.data().count;
        } else {
            return 0;
        }
    };
    
    const updateKillCount = async (incrementBy) => {
        const docRef = db.collection("stats").doc("killCount");
        const docSnap = await docRef.get();
        if (docSnap.exists()) {
            await docRef.update({
                count: firebase.firestore.FieldValue.increment(incrementBy)
            });
        } else {
            await docRef.set({
                count: incrementBy
            });
        }
    };


    
    
    
    const handleNext = async () => {
        currentProblemIndex++;
        if (currentProblemIndex < problems.length) {
            updateProblem();
        } else {
            let totalKillCount = getKillCount();
            resultsText.style.display = 'none';
            pullLeverButton.style.display = 'none';
            doNothingButton.style.display = 'none';
            problemText.textContent = `You have completed all the problems! Your decisions led to at least ${killCount} being people killed. All time ${totalKillCount} people have been killed.`;
            problemImage.style.display = 'none';
            nextButton.style.display = 'none';
        }
    };

    const handleBack = async () => {
        if (currentProblemIndex > 0) {
            currentProblemIndex--;
            updateProblem();
        }
    };
    
    pullLeverButton.addEventListener('click', () => handleVote('pullLever'));
    doNothingButton.addEventListener('click', () => handleVote('doNothing'));
    nextButton.addEventListener('click', handleNext);
    document.getElementById('next-arrow').addEventListener('click', handleNext);
    document.getElementById('back-arrow').addEventListener('click', handleBack);
    
    updateProblem();
    
});