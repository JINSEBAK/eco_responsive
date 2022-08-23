const open = getParameters('open');

$(function() {

    const noticeId = getParameters('noticeId');
    getDetailNotice(noticeId);

});

function getDetailNotice(noticeId) {
    var params = {
        noticeId:noticeId
    };

    //console.log(params);

    dataGet("/notice/noticeDetail", params).done(function(result) {
        console.log(result);
        if(result.resultCode == "SUCCESS"){
            
            let date = result.resultData.regDts.substring(0,16);

            $("#noticeTitle").html(result.resultData.noticeTitle);
            $("#regDts").html(date);

            let cntt = result.resultData.noticeCntt.replace(/\n/g, "<br/>");
            $("#noticeCntt").html(cntt);

        }else {
            callAlert({
                title: commErrMsg[result.resultCode].title,
                description: commErrMsg[result.resultCode].description,
              });
        }
    });
}