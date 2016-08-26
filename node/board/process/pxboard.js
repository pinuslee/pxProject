/**
 * Created by pinus on 16. 7. 11.
 */

require("dateformat");

var db = require("./db_pxboard");

//class 선언
var pxboard = function (req, res) {
	// member
	var info = {
		boardID: "1",
		title : 'Pinus Board Project',
		name : 'Pinus Board',
		action : 'list'
	};

	function parseReq(req) {
		info.boardID = req.params.id || req.body.id || "1";
		info.action = req.params.action || req.body.action || "list";
		info.page = req.params.page || "1";

		if(isNaN(info.boardID))
			throw new Error("wrong board id");
	}

	function resList(req, res){
		var pageInfo = {
			limitListSize: 10, // 표시 될 글목록 사이즈
			pageSize: 10, // 표시 될 페이징 사이즈
			curPage: 1,
			startPage: 1,
			endPage: 1,
			totalPage: 1,
			maxCount: 1
		};
		pageInfo.curPage = parseInt(req.params.page|| 1);
		db.pxBoard.count(function(err,count){
			if(err) throw new Error("list page error :" + err);
			var beginPage = (pageInfo.curPage -1) * pageInfo.limitListSize;
			pageInfo.totalPage = Math.ceil(count/pageInfo.limitListSize);
			pageInfo.startPage = Math.floor((pageInfo.curPage-1)/pageInfo.pageSize)*pageInfo.pageSize+1;
			pageInfo.endPage = pageInfo.startPage+(pageInfo.pageSize-1);
			if( pageInfo.endPage > pageInfo.totalPage ){
				pageInfo.endPage = pageInfo.totalPage;
			}

			pageInfo.maxCount = count-((pageInfo.curPage-1)*pageInfo.limitListSize);
			db.pxBoard.find({}).sort("-num")
				.skip(beginPage).limit(pageInfo.limitListSize)
				.exec(function (err, docs){
					if(err) throw new Error("res list err -", err);
					res.render('pxboard/list', {
						info: info,
						list: docs,
						page: pageInfo
					});
				});
		});
	}

	function resViewForm(req, res, mode){
		var action = { /* defualt values */
			readonly: false,
			mode: 'view',
			doc: {
				num: 0,
				title: '',
				content: '',
				password: ''
			}
		};

		if(mode!=='write') {
			//view & modify
			//get data
			if(mode==='view') {
				action.readonly = true;
			}
			else {
				action.mode = 'update';
			}
			var num = parseInt(req.param('num'));
			if (isNaN(num))
				throw new Error('wrong index');
			else{
				db.pxBoard.findOne({num: num}).exec(function (err, doc){
					if(err) throw new Error('res view err -', err);
					action.doc = doc;
					//console.log('doc:' + doc);
					res.render('pxboard/views', {
						info: info,
						action: action
					});
				});
			}
		}else{
			action.mode = 'insert';
			res.render('pxboard/views', {
				info: info,
				action: action
			});
		}
	}

	function resInsert(content, res){
		//console.log(content);
		var pxboard = db.pxBoard({
			boardID : content.id,
			title : content.title,
			content : content.content,   //조회수
			password : content.password // 비밀번호
		});
		pxboard.save(function(err, doc){
			if(err) throw new Error("res save err -", err);
			//console.log('doc:', doc);
			//res.send(doc);
			res.redirect('/pxboard/' + content.id + '/list/');
		});
	}

	function resUpdate(content, res){
		var num = parseInt(req.param('num'));
		if (isNaN(num))
			throw new Error("wrong index");
		else {
			db.pxBoard.findOne({num:num}).exec( function(err,doc){
				if(content.password===doc.password){
					doc.title = content.title;
					doc.content = content.content;
					doc.save( function(err, doc){
						if(err) throw new Error("res save err -", err);
						//console.log('doc:', doc);
						res.redirect('/pxboard/' + content.id + '/list/');
					});
				}
			});
		}
	}

	function resPassword(req, res){
		var num = parseInt(req.param('num'));
		var action = req.param('moreA');
		var msg = parseInt(req.param('msg'));
		var message = null;
		if (isNaN(num))
			throw new Error("wrong index");
		else {
			if(!isNaN(msg)){
				switch(msg){
					case 12://잘못된 패스워드 입니다.
						message ="정확한 패스워드를 입력해주셔요.!";
						break;
					default:
						message = null;
						break;
				}
			}
			res.render('pxboard/password', {
				info: info,
				num: num,
				action: action,
				msg: message
			});
		}
	}
	function resDelete(content, res){
		var num = content.num;
		var password = content.password;

		db.pxBoard.findOne({num:num}, {password:1}).exec( function(err,doc){
			if(password===doc.password){
				db.pxBoard.remove({num:num, password:password}).exec(function(err){
					if(err) throw new Error("res delete err -", err);
					res.redirect('/pxboard/' + content.boardID + '/list/');
				});
			}
			else {
				res.redirect('/pxboard/' + content.boardID + '/password/?msg=12&num=' + num );
			}
		});
	}

	function route(req, res){
		parseReq(req);
		switch (info.action)
		{
			case "list":
				resList(req, res);
				break;
			case "view":
			case "write":
			case "modify":
				resViewForm(req, res, info.action);
				break;
			case "password":
				resPassword(req, res);
				break;
			case "delete":
				resDelete(req.body, res);
				break;
			case "insert":
				resInsert(req.body, res);
				break;
			case "update":
				resUpdate(req.body, res);
				break;
			default:
				throw new Error("Cannot find action["+info.action+"] value.!");
				break;
		}
	}

	//default function : 생성자 같은 역활
	route(req, res);
};

module.exports = pxboard;


