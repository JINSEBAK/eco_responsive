const searchData = {
    page:1
    ,pageSize:10
    ,searchStartDt:""
    ,searchEndDt:""
    ,searchType:""  
    ,searchValue:""
}

let isNextPage = true;

$(function() {

    // $('#pagination').twbsPagination({
    //     totalPages: 1, // 전체 페이지
    //     startPage: searchData.page, // 시작(현재) 페이지
    //     visiblePages: 10, // 최대로 보여줄 페이지
    //     prev: '<',//'<a href="#" class="prev"></a>', // Previous Button Label
    //     next: '>',//<a href="#" class="next"></a>', // Next Button Label
    //     first: '<<',//<a href="#" class="first"></a>', // First Button Label
    //     last: '>>',//<a href="#" class="last"></a>', // Last Button Label
    //     onPageClick: function (event, page) { // Page Click event
    //         console.info("current page : " + page);


    //         searchData.page = page;
    //         getNoticeList();

    //     }
    // }).on('page', function (event, page) {
    //     //getNoticeList();
    // });

    getNoticeList();

    $('#searchBtn').on('click', function() {

        searchData.searchType = $("#searchType option:selected").val();
        searchData.searchValue = $('#searchValue').val();

        // if (searchData.searchValue == null || searchData.searchValue == '') {
        //     alert("검색어를 입력하세요.")
        //     return;
        // }

        searchData.page = 1;
        getNoticeList();
    });
});


function getNoticeList() {

    $('#noticeList>tbody').empty();

    var params = {
        page:searchData.page
        ,pageSize:searchData.pageSize
        ,searchType:searchData.searchType
        ,searchValue:searchData.searchValue
    };

    //console.log(params);

    dataGet("/notice/noticeList", params,false,true).done(function(result) {
        console.log(result);
        if(result.resultCode == "SUCCESS"){
            
            $('#notiCnt').text(result.resultData.list.length);

            if (result.resultData.list.length <= 0) {
                //resultNoData();
                return;
            }

            isNextPage = result.resultData.next;

            $.each(result.resultData.list, function(idx, item){
                addNoticeList(item,idx);
            });

            //$("#pagination").twbsPagination("changeTotalPages", result.resultData.totalPage, searchData.page);
            $('.pagination').twbsPagination('destroy');


            $('#pagination').twbsPagination({
                totalPages: result.resultData.totalPage, // 전체 페이지
                startPage: searchData.page, // 시작(현재) 페이지
                visiblePages: 10, // 최대로 보여줄 페이지
                prev: '<',//'<a href="#" class="prev"></a>', // Previous Button Label
                next: '>',//<a href="#" class="next"></a>', // Next Button Label
                first: '<<',//<a href="#" class="first"></a>', // First Button Label
                last: '>>',//<a href="#" class="last"></a>', // Last Button Label
                onPageClick: function (event, page) { // Page Click event
                    //console.info("current page : " + page);
                    searchData.page = page;
                }
            }).on('page', function (event, page) {
                getNoticeList();
            });
        } else {
            $('#notiCnt').text('0');

            $('#pagination').twbsPagination('destroy');
        }
    });

    // $.ajax({
    //     url: "/notice/noticeList",
    //     type: "GET",
    //     async: false,
    //     dataType: "",
    //     contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    //     traditional: true,
    //     data: params,
    //     success: function(result){
    //         console.log(result);
    //         if(result.resultCode == "SUCCESS"){
                
    //             if (result.resultData.list.length <= 0) {
    //                 $('#pagination').twbsPagination('destroy');
    //                 flag = true;	
    //                 return;
    //             }

    //             isNextPage = result.resultData.next;

    //             $.each(result.resultData.list, function(idx, item){
    //                 addNoticeList(item,idx);
    //             });

    //             //$('#pagination_div').html('');
    //             //$('#pagination_div').html('<ul id="pagination" class="pagination"></ul>');

    //             $("#pagination").twbsPagination("changeTotalPages", result.resultData.totalPage, searchData.page);

    //         }else {
    //             $('#pagination').twbsPagination('destroy');
    //             flag = true;	
    //         }
    //     },
    //     complete: function(){	
    //         flag = true;	
    //     }
    // });
    
}

function addNoticeList(item,idx) {

    let date = item.regDts.substring(0,16);

    var innerHtml = "";
    innerHtml += '<tr>';
    innerHtml += '<td>' + (idx + 1) +'</td>';
    innerHtml += '<td><a href="javascript:detailNotice(\'' + item.noticeId + '\');">' + item.noticeTitle + '</a></td>';
    innerHtml += '<td>' + date + '</td>';
    innerHtml += '</tr>';      

    $('#noticeList>tbody').append(innerHtml);
    //$('#recItemTable').prepend(innerHtml);

}

function detailNotice(id) {
    window.location.href = "/notice/view?noticeId=" +id;
}