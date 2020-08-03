'use strict';


var gProjectsName=['Minesweeper','Guess-Me','Touch The Nums','Pacman','In-Picture','Ball-Board','Book-Shop'];
var gProjectsTiteles=['Better be carful...','Lets see who will win...','lets see how fast you are','lets brake down Amazon !','Do you recognize me ?','Too many balls to collect...','The old and beloved pacman',];
var gProjects;

function _createProjects() {
    var projects=[];
    projects=gProjectsName.map(function(projectName,idx){
        return _createProject(projectName,gProjectsTiteles[idx]);
    });
    gProjects=projects;
}

function _createProject(name,title) {
    return {
        id: name,
        title: title,
        desc: makeLorem(),
        url:`projects/${name}/index.html`
    };
}

function getProjectByName(name) {
    var projectItem=gProjects.find(function(project){
        return project.id===name;
    });
    return projectItem;
}

function getProjects() {
    return gProjects;
}