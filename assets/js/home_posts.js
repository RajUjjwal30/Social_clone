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
                    console.log('data');
                }, error : function(error){
                    console.log(error.responsText);
                }
            });


        });
     }
     //method to create a post in DOM

     createPost();
}