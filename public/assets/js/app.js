

$.getJSON('/scrappedArticles', function(data){
    // let x = 1;
    for(let i=0; i<data.length; i++){
        
        // console.log(data[i]);
        // var row = $("<div class='row'></div>");
        var col = $('<div class="col s4"><div>');
        var card = $("<div class='card blue-grey darken-1'></div>");
        var cardContent = $('<div class="card-content white-text"></div>');
        var span = $('<span class="card-title">'+data[i].title+'</span>')
        var p = $('<p>'+data[i].link+'</p>');
        // span.append(p);
        cardContent.append(span);
        cardContent.append(p);
        var cardAction = $('<div class="card-action"></div');
        var a = $('<a class="btn btn-primary btn-lg" data-id="'+data[i]._id+'" href="./" id="saveBtn" role="button">'+'Save Article'+'</div>');
        cardAction.append(a);
        card.append(cardContent);
        card.append(cardAction);
        col.append(card);
        // row.append(col);
        $('#articles').append(col);
        // x++;
    }
})


$.getJSON('/saved', function(data){
    // let x = 1;
    for(let i=0; i<data.length; i++){
        
        // console.log(data[i]);
        // var row = $("<div class='row'></div>");
        var col = $('<div class="col s4"><div>');
        var card = $("<div class='card blue-grey darken-1'></div>");
        var cardContent = $('<div class="card-content white-text"></div>');
        var span = $('<span class="card-title">'+data[i].title+'</span>')
        var p = $('<p>'+data[i].link+'</p>');
        // span.append(p);
        cardContent.append(span);
        cardContent.append(p);
        var cardAction = $('<div class="card-action"></div');
        var a = $('<a class="waves-effect waves-light btn modal-trigger" data-title="'+data[i].title+'" data-id="'+data[i]._id+'" href="#modal1" id="notesBtn" role="button">'+'Add Notes'+'</a>');        
        // var a = $('<a class="btn btn-primary btn-lg" data-id="'+data[i]._id+'" id="notesBtn" role="button">'+'Add Notes'+'</a>');
        var b = $('<a class="btn btn-primary btn-lg" data-id="'+data[i]._id+'" href="./savedArticles" id="removeBtn" role="button">'+'Remove Article from Saved'+'</div>');   
        cardAction.append(a);
        cardAction.append(b);        
        card.append(cardContent);
        card.append(cardAction);
        col.append(card);
        // row.append(col);
        $('#savedArticles').append(col);
        // x++;
    }
})

$(document).on('click', '#scrape', function(){

    $.ajax({
        method: 'GET',
        url: '/scrape',
    })
    .then(function(data){
        // console.log("data from scrape ajax call: "+data)
        location.reload(true);
    });
    
});

$(document).on('click', '#removeArticles', function(){

    $.ajax({
        method: 'GET',
        url: '/deleteArticles',
    })
    .then(function(data){
        // console.log("data from scrape ajax call: "+data)
        location.reload(true);
    });
    
});

$(document).on('click', '#saveBtn', function(){

    var id = $(this).attr('data-id');

    $.ajax({
        method: 'GET',
        url: '/savedArticles/'+id
    }).then(function(savedArticle){
        // console.log(savedArticle);
    })
});

$(document).on('click', '#removeBtn', function(){

    var id = $(this).attr('data-id');

    $.ajax({
        method: 'GET',
        url: '/removeArticles/'+id
    }).then(function(savedArticle){
        // console.log(savedArticle);
    })
});

$(document).on('click', '#notesBtn', function(){

    $('#bodyinput').val("");
    $('#articleTitle').text($(this).attr('data-title'));
    $('.modal-close').attr({'data-id':$(this).attr('data-id')});
    $('.modal-close').attr({'data-title':$(this).attr('data-title')});

    var id = $(this).attr('data-id');
    console.log("id: "+id)

    $.ajax({
        method: 'GET',
        url: '/articlesNotes/'+id
    }).then(function(data){
        // console.log(data);
        if(data.note){
            console.log("get the notes here");
            $('#bodyinput').val(data.note.body);
        }
    })
    
});

$(document).ready(function(){
    $('#modal1').modal();
});

$(document).on('click', '.modal-close', function(){
    $.ajax({
        url: '/articlesNotes/'+$(this).attr('data-id'),
        method: "POST",
        data: {
            title: $(this).attr('data-title'),
            body: $('#bodyinput').val()
        }
    }).then(function(dbNotes){
        // console.log(dbNotes);
        // $('#modal1').empty()
    });

    $('#bodyinput').val("");
})