{
    //1. a function which handles the submission of the post(sending data)
    //method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        //prevent default ->avoid to execute the actual submit of the form
        newPostForm.submit(function(e){
            e.preventDefault();

            //submitting it through AJAX
            $.ajax({
                type : 'post',
                url : '/posts/create',
                data : newPostForm.serialize(),
                //data : newPostForm.serialize() --> converts the form data into JSON
                success : function(data){

                    //calling postDom function
                    let newPost = newPostDom(data.data.post);

                    $('#posts-list-container>ul').prepend(newPost);
                    //.prepend in place of .append because new post created will be on top

                    




                    //(populating 'deleteLink') for deleting all posts that is dynamicaaly added
                    deletePost($(' .delete-post-button', newPost));
                    //there is space b/w ' and .

                }, error : function(error){
                    console.log(error.responseText);
                }
            });


        });
     }
     //${post._id} --> for displaying the post
     //method to create a post in DOM
     let newPostDom = function(post){
        return $(`<li id= "post-${post._id}">
        
                                        
            <p>

                <small>
                    <a class="delete-post-button" href="/posts/destroy/${ post._id }">X</a>
                </small>
            
                ${ post.content } 
                <br>
                <small>
                        ${ post.user.name } 
                </small>
                

            </p>
                
                <div class="post-comments">
                        
                        
                                <form action="/comments/create" method="post">
                                        <input type="text" name="content" placeholder="Type here to add comment..!" required>

                                        
                                        <input type="hidden" name="post" value="${ post._id}" >
                                        <input type="submit" value="Add comment">

                                </form>


                   
                
                    <div class="post-comments-list">
                                <ul id="post-comments- ${post._id}">
                                        
                                        

                                </ul>


                    </div>

                 </div>

    
        </li>
                `)
            }

            //method to delete a post from DOM
            //this is function which is sending ajax request
            //we need to populate this 'deleteLink'
            let deletePost = function(deleteLink){
                $(deleteLink).click(function(e){
                    e.preventDefault();

                    $.ajax({
                        type : 'get',
                        //this is how you get the value of href in <a> tag
                        url : $(deleteLink).prop('href'),
                        success : function(data){
                            $(`#post-${data.data.post_id}`).remove();
                        },error : function(error){
                            console.log(error.responseText);
                        }
                    });
                });
            }

            createPost();
}