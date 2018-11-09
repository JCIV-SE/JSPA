allUserData = `{
  user(UserName: "Draco") {
    id
    firstName
    lastName
    password
    email
    phone
    applications {
    	companyName
      title
      dateApplied
      link
      description
      notes
      notification
      ContactId
      UserId
      contact {
        firstName
        lastName
        email
        phone
      }
    }
  }
}`;

addApplication = `mutation addApp($companyName: String!, $title: String!, $dateApplied: String!, $link: String!, $description: String!, $notes: String!, $notification: Int!, $ContactId: String!, $UserId: String!, $status: String!	){
  addApplication( 
  	companyName: $companyName,
    title: $title,
    dateApplied: $dateApplied,
    link: $link,
    description: $description,
    notes: $notes,
    notification: $notification,
    ContactId: $ContactId,
    UserId: $UserId,
    status: $status
  ) {
    companyName,
    title,
    dateApplied,
    link,
    description,
    notes,
    notification,
    contact{
      firstName,
      id,
      email,
      lastName,
      phone
    },
    UserId,
    ContactId
  }
}`;

module.exports = {
  allUserData,
  addApplication
};
