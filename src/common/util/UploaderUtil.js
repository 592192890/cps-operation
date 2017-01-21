'use strict';

function UploaderUtil() {}

var checkFileType = function(fileName, suffixs) {
	var type = '|' + fileName.slice(fileName.lastIndexOf('.') + 1) + '|';
	var flag = false;
	for (var i in suffixs) {
		flag = ('|' + suffixs[i] + '|').indexOf(type) !== -1;
		if (flag) {
			break;
		}
	}
	
	if (!flag) {
		alert('取入文件类型应该为[' + suffixs.join('、') + ']格式之一');
	}
	
	return flag;
};

var filterDefine = {
	zipFilter: {
		name: 'zipFilter',
		fn: function(item, options) {
			if (this.queue.length > 0) {
				alert('一次只能取入一个文件');
				return false;
			} else {
				return checkFileType(item.name, ['zip']);
			}
		}
	},
	xslFilter: {
		name: 'xslFilter',
		fn: function(item, options) {
			return checkFileType(item.name, ['xls', 'csv', 'odt', 'xlsx']);
		}
	},
	jsFilter: {
		name: 'jsFilter',
		fn: function(item, options) {
			if (this.queue.length > 0) {
				alert('一次只能取入一个文件');
				return false;
			} else {
				return checkFileType(item.name, ['js']);
			}
		}
	},
	imgFilter: {
		name: 'jsFilter',
		fn: function(item, options) {
			if (this.queue.length > 0) {
				alert('一次只能取入一个文件');
				return false;
			} else {
				return checkFileType(item.name,  ['png', 'jpg', 'gif','bmp','tiff']);
			}
		}
	},
	voiceFilter: {
		name: 'voiceFilter',
		fn: function(item, options) {
			if (this.queue.length > 0) {
				alert('一次只能取入一个文件');
				return false;
			} else {
				return checkFileType(item.name,  ['mp3', 'mp4','wav','wma','au','aiff','ape']);
			}
		}
	},
	encourageFilter: {
        name: 'encourageFilter',
        fn: function(item, options) {
        	if (this.queue.length > 0) {
				alert('一次只能取入一个文件');
				return false;
			} else {
				return checkFileType(item.name, ['pdf', 'jpg','png','bmp','gif','zip','rar']);
			}
        }
    },
    otherFilter: {
        name: 'xslFilter',
        fn: function(item, options) {
            return checkFileType(item.name, ['xls', 'csv', 'odt', 'xlsx','doc','docx']);
        }
    }
};

UploaderUtil.create = function(FileUploader, options) {
	var filters = [];
	for (var i in options.filters) {
		if (options.filters[i]) {
			filters.push(filterDefine[options.filters[i]]);
		}
	}
	var _options = {
		autoUpload: false,
		withCredentials: true,
		onAfterAddingFile: function(item) {
			if (options.success) {
				item.onSuccess = options.success;
			}
			if (options.cancel) {
				item.onCancel = options.cancel;
			}
		},
		onWhenAddingFileFailed: function(item, filter, __options) {
			if (options.onFailedFilter) {
				options.onFailedFilter(item, filter, __options);
			}
		}
	};
	angular.extend(_options, options);
	_options.filters = filters;
	var uploader = new FileUploader(_options);
	return uploader;
};

UploaderUtil.upload = function(fileItem, formData) {
	if (fileItem) {
		fileItem.formData = formData;
		fileItem.upload();
	}
};

UploaderUtil.clear = function(uploader, inputSelector) {
	uploader.clearQueue();
	var f = document.querySelector(inputSelector);
	if (f.value) {
		var form = document.createElement('form');
		var ref = f.nextSibling;
		form.appendChild(f);
		form.reset();
		ref.parentNode.insertBefore(f, ref);
	}
};