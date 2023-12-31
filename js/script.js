/*
  This function runs when the add button is clicked so a case can be created. This will
  grab all the values in the form and add them as a ticket below the form.
*/
function saveIssue(e) {
  // Retrieve values from the form
  let issueDesc = document.getElementById('issueDescInput').value;
  let issueTypeDevice = document.getElementById('type-of-device').value;
  let issueWarranty = document.getElementById('warranty').value;
  let issueSeverity = document.getElementById('issueSeverityInput').value;
  let issueAssignedTo = document.getElementById('issueAssignedToInput').value;
  let issueId = chance.guid();
  let issueStatus = 'Open';

  // Ensure description and assigned to fields are not empty
  if (issueDesc === '' || issueAssignedTo === '') {
    alert(
      'Error: Please enter in a description for your issue and the name of someone to monitor to create a ticket.'
    );
    return;
  }

  /* 
    Save all the values entered in the form, save them to local storage, and then call the fetchIssues function.
  */
  let issue = {
    id: issueId,
    description: issueDesc,
    typeOfDevice: issueTypeDevice,
    warranty: issueWarranty,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus,
  };

  if (localStorage.getItem('issues') == null) {
    let issues = [];
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  } else {
    let issues = JSON.parse(localStorage.getItem('issues'));
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }

  // Reset form and fetch issues
  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

/*
  This function gathers all of the values that were passed to the
  local storage and passes them through an array to display them
  on screen via innerHTML.
*/
function fetchIssues() {
  // Retrieve issues from local storage
  let issues = JSON.parse(localStorage.getItem('issues'));

  // Select the element to display issues
  let issuesList = document.getElementById('issuesList');

  // Clear existing content
  issuesList.innerHTML = '';

  // Loop through each issue and create HTML representation
  for (let i = 0; i < issues.length; i++) {
    // Retrieve issue details
    let id = issues[i].id;
    let desc = issues[i].description;
    let typeOfDevice = issues[i].typeOfDevice;
    let warranty = issues[i].warranty;
    let severity = issues[i].severity;
    let assignedTo = issues[i].assignedTo;
    let status = issues[i].status;

    // Construct HTML for displaying the issue
    let issueHTML =
      '<div class="well">' +
      '<h6>Issue ID: ' +
      id +
      '</h6>' +
      '<p><span class="label label-info">' +
      status +
      '</span></p>' +
      '<h3>Description: ' +
      desc +
      '</h3>' +
      '<p>Type Of Device: <span class="glypicon glypicon-time"></span> ' +
      typeOfDevice +
      '</p>' +
      '<p>Warranty: <span class="glypicon glypicon-time"></span> ' +
      warranty +
      '</p>' +
      '<p><span class="glypicon glypicon-time"></span> ' +
      severity +
      '</p>' +
      '<p>Monitored By: <span class="glypicon glypicon-user"></span> ' +
      assignedTo +
      '</p>' +
      '<div class="btn-group">';

    // Add "Close" button only if the status is not "Closed"
    if (status === 'Closed') {
      issueHTML +=
        '<a href="javascript:void();" onclick="reopenIssue(\'' +
        id +
        '\')" class="btn btn-success">Reopen</a>';
    }
    // Add "Reopen" button only if the status is "Closed"
    else {
      issueHTML +=
        '<a href="javascript:void();" onclick="setStatusClosed(\'' +
        id +
        '\')" class="btn btn-warning">Close</a>';
    }

    // Add "Delete" button
    issueHTML +=
      '<a href="javascript:void();" onclick="deleteIssue(\'' +
      id +
      '\')" class="btn btn-danger">Delete</a>';

    issueHTML += '</div></div>';

    // Append the issue HTML to the list
    issuesList.innerHTML += issueHTML;
  }
}

/*
  This function will set the ticket to close once the close button is clicked. 
  It will then call the fetchIssues function to update it on the screen.
*/
function setStatusClosed(id) {
  // Retrieve issues from local storage
  let issues = JSON.parse(localStorage.getItem('issues'));

  // Update the status of the specified issue to "Closed"
  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues[i].status = 'Closed';
    }
  }

  // Save the updated issues to local storage
  localStorage.setItem('issues', JSON.stringify(issues));

  // Fetch and display the updated issues
  fetchIssues();
}

/*
  This function will delete the ticket from the local storage when the
  delete button is clicked and then call the fetchIssues function to 
  update the screen.
*/
function deleteIssue(id) {
  // Retrieve issues from local storage
  let issues = JSON.parse(localStorage.getItem('issues'));

  // Remove the specified issue from the array
  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues.splice(i, 1);
    }
  }

  // Save the updated issues to local storage
  localStorage.setItem('issues', JSON.stringify(issues));

  // Fetch and display the updated issues
  fetchIssues();
}

/*
  This function will reopen the ticket and put it back to an open status
  when the reopen button is clicked. It will then call the fetchIssues 
  function to update it on the screen.
*/
function reopenIssue(id) {
  // Retrieve issues from local storage
  let issues = JSON.parse(localStorage.getItem('issues'));

  // Update the status of the specified issue to "Open"
  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues[i].status = 'Open';
    }
  }

  // Save the updated issues to local storage
  localStorage.setItem('issues', JSON.stringify(issues));

  // Fetch and display the updated issues
  fetchIssues();
}
