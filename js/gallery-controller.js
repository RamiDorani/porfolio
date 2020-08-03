'use strict';

$('document').ready(onInit);

function onInit() {
  _createProjects();
  renderProjects();
}

function renderProjects() {
  var projects = getProjects();
  //console.log(projects);
  var strHTML = '';
  for (var i = 0; i < projects.length; i++) {
    strHTML +=
      `   
              <div class="col-md-4 col-sm-6 portfolio-item" onclick="onOpenModal('${projects[i].id}')">
      <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1">
      <div class="portfolio-hover">
      <div class="portfolio-hover-content">
                <i class="fa fa-plus fa-3x"></i>
              </div>
            </div> 
            <img class="img-fluid" src="img/portfolio/${projects[i].id}.png" alt="">
            </a>
            <div class="portfolio-caption">
            <h4>${projects[i].id}</h4>
          </div>
        </div>
        `
  }
  $('.projects-section').html(strHTML);
}



function onOpenModal(name) {
  var project = getProjectByName(name)
  $('#portfolioModal1 h2').text(name);
  $('.item-intro').text(project.title);
  $('.project-info').text(project.desc);
  $('.modal-img').attr('src', `img/portfolio/${name}.png`)
  $('.visit-project').attr('href', project.url);
}

function onSendMail() {
  var sub = $('.mail-title').val();
  var body = $('.mail-body').val();
  window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=ramid1703@gmail.com&su=${sub}&body=${body}`);
  $('.mail-title').val('');
  $('.mail-body').val('');

}


function test() {
  $('.offcanvas-aside').show();
}