export default {
  // download(url) {
  //   var tempLink = document.createElement('a');
  //   tempLink.setAttribute('download', '');
  //   tempLink.href = window.location.host + url;
  //   tempLink.setAttribute('target', '_blank');
  //   document.body.appendChild(tempLink);
  //   tempLink.click();
  //   document.body.removeChild(tempLink);
  // }
  download(url) {
    var id = 'download-iframe';
    var frame;
    if (document.getElementById(id)) {
      frame = document.getElementById(id);
    }
    else {
      frame = document.createElement('iframe');
      frame.setAttribute('id', id);
      document.body.appendChild(frame);
    }
    frame.style.height= '1px';
    frame.style.width = '1px';
    frame.src = 'http://' + window.location.host + url;
  }
}