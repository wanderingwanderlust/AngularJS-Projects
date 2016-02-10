(function(){

    var app = angular.module('myQuiz', []);

    app.controller('QuizController', ['$scope', '$http', '$sce', function($scope,$http,$sce){

        //setting variables
        $scope.score = 0;
        $scope.activeQuestion = -1;
        $scope.activeQuestionAnswered = 0;
        $scope.percentage = 0;

        //retrieving json file
        $http.get('quiz_data.json').then(function(quizData){
            $scope.myQuestions = quizData.data;
            $scope.totalQuestions = $scope.myQuestions.length;
        });
        //names reassigned to get users answer choice
        $scope.selectAnswer = function(qIndex,aIndex){
            //alert(qIndex + 'and' + aIndex);
            var questionState = $scope.myQuestions[qIndex].questionState;

            if( questionState != 'answered' ){
                //questions has not been answered
                $scope.myQuestions[qIndex].selectedAnswer = aIndex;
                var correctAnswer = $scope.myQuestions[qIndex].correct;
                $scope.myQuestions[qIndex].correctAnswer = correctAnswer;

                if( aIndex === correctAnswer ){
                    $scope.myQuestions[qIndex].correctness = 'correct';
                    $scope.score += 1;
                }else{
                    $scope.myQuestions[qIndex].correctness = 'incorrect';
                }
                $scope.myQuestions[qIndex].questionState = 'answered';
            }
            $scope.percentage = (($scope.score / $scope.totalQuestions) * 100).toFixed(0);

        }

        $scope.isSelected = function(qIndex, aIndex){
            return $scope.myQuestions[qIndex].selectedAnswer === aIndex;
        }
        $scope.isCorrect = function(qIndex, aIndex){
            return $scope.myQuestions[qIndex].correctAnswer === aIndex;
        }
        $scope.selectContinue = function(){
            return $scope.activeQuestion += 1;
        }
        $scope.createShareLinks = function(percentage){

            var url = 'http://codifydesign.com';

            var emailLink = '<a href="mailto:?subject=Try to beat my quiz score!&amp;body= I scored a '+percentage+'% on this this quize about Saturn. Try to beat my score at ' +url+'" class="btn email"> Email a friend</a> ';
            var twitterLink = '<a class="btn twitter" target="_blank" href="http://twitter.com/share?text= I scored '+percentage+'%! Try to beat me at&hashtags=SaturnQuiz&url='+url+'"> Tweet your scoree</a> ';

            var newMarkup = emailLink + twitterLink;

            return $sce.trustAsHtml(newMarkup);
        }


        }]);

})();
