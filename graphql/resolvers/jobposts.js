const { AuthenticationError, UserInputError } = require('apollo-server');
const JobPost = require('../../models/JobPost');
const checkAuth = require('../../util/authenticators');
module.exports= {
    Query:{
        async searchJobPosts(_,{search}){
          let searchQuery = {};
          if (search) {
            // update the search query
            searchQuery = {
              $or: [
                { title: { $regex: search, $options: 'i' } },
                { company: { $regex: search, $options: 'i' } },
                { body: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } }
              ]
            };
          }
          try{
                const jobposts = await JobPost.find(searchQuery).sort({ createdAt: -1 });
                return jobposts;
            } catch(err){
                throw new Error(err);
            }
        },
        async getJobPosts(){
            try{
                const jobposts = await JobPost.find().sort({ createdAt: -1 });
                return jobposts;
            } catch(err){
                throw new Error(err);
            }
        },
        async getJobPostsBy(_, {username}){
          try{
              const jobposts = await JobPost.find({username:username}).sort({ createdAt: -1 });
              return jobposts;
          } catch(err){
              throw new Error(err);
          }
      },
        async getJobPost(_, {postId}){
            try{
                const jobPost = await JobPost.findById(postId);
                if(jobPost){
                    return jobPost;
                }
                else{
                    throw new Error('Job post not found')
                }
            } catch(err){
                throw new Error(err);
            }
        }
    },
    Mutation:{
        async createJobPost(_, { body, company, salary, title, location }, context) {
            const user = checkAuth(context);
      
            if (body.trim() === '') {
              throw new Error('Post body must not be empty');
            }
            if (company.trim() === '') {
              throw new Error('Company field must not be empty');
            }
            if (salary.trim() === '') {
              throw new Error('Salary must not be empty');
            }
            if (title.trim() === '') {
              throw new Error('Title must not be empty');
            }
            if (location.trim() === '') {
              throw new Error('Location must not be empty');
            }
      
            const newJobPost = new JobPost({
              body,
              company,
              salary,
              title,
              location,
              user: user.id,
              username: user.username,
              createdAt: new Date().toISOString()
            });
      
            const jobPost = await newJobPost.save();
      
            return jobPost;
        },
        async deleteJobPost(_, { postId }, context) {
            const user = checkAuth(context);
      
            try {
              const jobPost = await JobPost.findById(postId);
              if (user.username === jobPost.username) {
                await jobPost.delete();
                return 'Post deleted successfully';
              } else {
                throw new AuthenticationError('Action not allowed');
              }
            } catch (err) {
              throw new Error(err);
            }
        },
        async addApplicant(_,{postId, resume, originalFile}, context){
          if (resume.trim() === '') {
            throw new Error('Resume is empty');
          }
          const user = checkAuth(context);
          try {
            await JobPost.findByIdAndUpdate(
              postId,
              {"$push":{
                applicants:{
                  username:user.username,
                  user: user.id,
                  resume: resume,
                  submittedAt: new Date().toISOString(),
                  originalFile: originalFile
                 }
                }
              }
            );
      
            return 'Resume submitted successfully';
              
          } catch (err) {
            throw new Error(err);
          }
        }
    }
}