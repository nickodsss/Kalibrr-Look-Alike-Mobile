import { gql } from "@apollo/client";

// TODO: Define the query needed here (don't forget to export)
export const GET_JOBS = gql`
  query GetAllJob {
  getAllJob {
    id
    title
    description
    companyId
    authorId
    jobType
    Company {
      id
      name
      companyLogo
      location
      email
      description
    }
    User {
      _id
      username
      email
      role
      phoneNumber
      address
    }
  }
}
`;

export const GET_JOBS_BY_ID = gql`
  query GetJobDetail($getJobDetailId: ID!) {
  getJobDetail(id: $getJobDetailId) {
    result {
      id
      title
      description
      companyId
      authorId
      jobType
      Company {
        id
        name
        companyLogo
        location
        email
        description
      }
      User {
        _id
        username
        email
        role
        phoneNumber
        address
      }
    }
    resultSkill {
      id
      jobId
      name
      level
    }
  }
}
`;


