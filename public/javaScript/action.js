    $(document).ready(function () {
   
      // getComments();
  
    $("#commentFormId").on("submit",function(e){
      e.preventDefault();
      postComment();
    })
   
  });

  
  function postComment(){
    const newComment=$("#textareaId").val();
    console.log(newComment);
    const articleId=$("#articleID").val();
    const date=
    $.ajax({
      url:"/admin/dashboard/viewArticles/viewThisArticle/add/"+articleId,
      method:"POST",
      data:{newComment,articleId},
      dataType:"json",
      contentType:"application/x-www-form-urlencoded",
      success:function(cb){
        console.log(cb.docComment);
        newUL = '<li class="ms-5"><span><b>' +cb.docComment.commentedBy.firstName+"</b></span> - <span>"+ cb.docComment.date +"</span><br>"+"<span>"+cb.docComment.commentBody+ "</span></li>"+"<hr>";
          $("#ulId").append(newUL);
      }
    });
    $("#commentFormId")[0].reset();
  }
  

  