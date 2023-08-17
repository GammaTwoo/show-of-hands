function createPoll() {
    // Get the question and options from the form
    const question = document.getElementById("pollQuestion").value;
    const options = Array.from(document.getElementsByName("option")).map(opt => opt.value.trim()).filter(opt => opt !== "");
    // Create a new poll object with a unique ID, the question, the options, and an empty results object
    const poll = {
        id: Date.now(),
        question: question,
        options: options,
        results: {}
    };
    // Get the existing polls from localStorage, add the new poll, and save the updated polls back to localStorage
    let polls = JSON.parse(localStorage.getItem("polls") || "[]");
    polls.push(poll);
    localStorage.setItem("polls", JSON.stringify(polls));
    showPollResults(poll.id);
}

function addOption() {
    // Get the container element for the poll options
    const optionsContainer = document.getElementById("pollOptions");
    // Get the number of existing options
    const optionCount = optionsContainer.children.length;
    // Create a new div element to hold the new option
    const newOption = document.createElement("div");
    // Add the "form-group" class to the new div element
    newOption.classList.add("form-group");
    // Create a new input element for the new option
    const input = document.createElement("input");
    // Add the "form-control" class to the new input element
    input.classList.add("form-control");
    // Set the name attribute of the input element to "option"
    input.name = "option";
    // Set the placeholder attribute of the input element to "Option {optionCount + 1}"
    input.placeholder = `Option ${optionCount + 1}`;
    // Append the input element to the new div element
    newOption.appendChild(input);
    // Append the new div element to the options container
    optionsContainer.appendChild(newOption);
  }

// This function shows the results for a poll with the given ID
function showPollResults(pollId) {
    // Retrieve the polls from localStorage
    const polls = JSON.parse(localStorage.getItem("polls") || "[]");

    // Find the poll with the given ID
    const poll = polls.find(p => p.id === pollId);

    // Check if the user has already voted for this poll
    const hasVoted = localStorage.getItem(`poll_${pollId}_voted`) === 'true';

    // Create a table to display the poll results
const table = document.createElement('table');
table.classList.add('table', 'table-striped');
const headerRow = table.insertRow();
const questionHeader = headerRow.insertCell();
questionHeader.textContent = 'Question';
const optionHeader = headerRow.insertCell();
optionHeader.textContent = 'Option';
const votesHeader = headerRow.insertCell();
votesHeader.textContent = 'Votes';

    // Populate the table with the poll results
    poll.options.forEach(option => {
        const row = table.insertRow();
        const questionCell = row.insertCell();
        questionCell.textContent = poll.question;
        const optionCell = row.insertCell();
        optionCell.textContent = option;
        const votesCell = row.insertCell();
        votesCell.textContent = poll.results[option] || 0;
    });

    // Add the table to the pollResults div
    const pollResultsDiv = document.getElementById('pollResults');
    pollResultsDiv.innerHTML = '';
    pollResultsDiv.appendChild(table);

    // Add a form for voting
    const voteForm = document.createElement('form');
    voteForm.addEventListener('submit', event => {
        event.preventDefault();
        const selectedOption = voteForm.querySelector('input[name="option"]:checked');
        if (selectedOption) {
            const option = selectedOption.value;
            if (!hasVoted) {
                poll.results[option] = (poll.results[option] || 0) + 1;
                localStorage.setItem(`poll_${pollId}_voted`, 'true');
                localStorage.setItem("polls", JSON.stringify(polls));
            }
            showPollResults(pollId);
        }
    });

// Add radio buttons for each option
poll.options.forEach(option => {
    const optionLabel = document.createElement('label');
    optionLabel.classList.add('form-check-label');
    optionLabel.textContent = option;
    const optionInput = document.createElement('input');
    optionInput.classList.add('form-check-input');
    optionInput.type = 'radio';
    optionInput.name = 'option';
    optionInput.value = option;
    optionInput.disabled = hasVoted;
    optionLabel.appendChild(optionInput);
    const optionDiv = document.createElement('div');
    optionDiv.classList.add('form-check');
    optionDiv.appendChild(optionLabel);
    voteForm.appendChild(optionDiv);
});

// Add a submit button to the form
const submitButton = document.createElement('button');
submitButton.type = 'submit';
submitButton.classList.add('btn', 'btn-primary');
if (hasVoted) {
    submitButton.textContent = 'Already Voted';
    submitButton.disabled = true;
} else {
    submitButton.textContent = 'Vote';
    submitButton.disabled = false;
}
submitButton.disabled = hasVoted;
voteForm.appendChild(submitButton);

// Add the form to the pollResults div
    pollResultsDiv.appendChild(voteForm);
}

/* if (
    question is empty
) then (
    display error "question is empty"
) 

if (
    option 1 or option 2 is empty
) then (
    display error "missing options"
)
*/
const questionInput = document.getElementById("pollQuestion");
const option1Input = document.getElementById("option1");
const option2Input = document.getElementById("option2");

if(questionInput.value.trim() === "") {
    questionInput.setCustomValidity("Question is empty");
    questionInput.reportValidity();
}

if (option1Input.value.trim() === "" || option2Input.value.trim() === ""){
    option1Input.setCustomValidity("Missing options");
    option1Input.reportValidity();
}