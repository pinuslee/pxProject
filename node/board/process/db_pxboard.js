/**
 * Created by pinus on 16. 7. 15.
 */

//전역 세팅
var pxMongoose = require("pxMongoose");
pxMongoose.connect('pxBoard');

var pxBoard = null;

init_pxboard();

function init_pxboard() {
	var pxBoardSchema = new pxMongoose.Schema({
		boardID : {
			type:Number,
			required: true,
			index: { unique: false, dropDups: false },
			ref:'boardid'
		}, //
		num : {
			type:Number,
			required: true,
			index: { unique: true, dropDups: true },
			ref:'Author'
		}, //
		title :{
			type:String,
			required: true,
			ref:'제 목'
		},
		content : {
			type:String,
			required: true,
			ref:'내용'
		},
		password : {
			type:String,
			required: true,
			ref:'비밀번호'
		},
		date : {
			type:Date,
			default: Date.now,
			ref:'작성일'
		}
	});

	var model_name = 'pxboard';

	pxBoardSchema.plugin(pxMongoose.autoIncrement.plugin,  {
		model: model_name,
		field: 'num',
		startAt: 1,
		incrementBy: 1
	});
	pxBoard = pxMongoose.addSchema(model_name, pxBoardSchema);
}

exports.pxBoard = pxBoard;