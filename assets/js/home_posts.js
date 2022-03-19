{
    //  method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            // We prevent form to be submit naturally
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                // convert the form data into json ; key->Content , value->Value in form
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDOM(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                }, 
                error: function(err){
                    console.log(err.responseText);
                }
            });
        });
    }

    // method to create a post in DOM
    let newPostDOM = function(post){
        return $(`<li id="post-${post._id}">
                <p>
                  
                <small>
                    <a class="delete-post-button" href="/posts/destroy/${post._id}> X </a>
                </small>   
                
                ${ post.content }
                <br>
                <br>
                <${ post.user.name }
                </p>
            
                <div class="post-comments">
                    
                        <form action="/comments/create" method="POST">
                            <input type="text" name="content" placeholder="Add Comment..." required>
                            <input type="hidden" name="post" value="${post._id}">
                            <input id="comment-submit-btn" type="submit" value="Add Comment">
                        </form>
                    
            
                    <div class="post-comments-list">
                        <ul id="post-comments-${post._id}">
                            
                        </ul>
                    </div>
            
                </div>
            
            </li> `)
    }
    
    // method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        })
    }

    createPost();
}