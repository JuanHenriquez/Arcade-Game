(function($){

    $(document).ready(function(){
        $('select').material_select();


        // UI & Visual.

        var menuIcon          = $('#menu-icon'),
            mainMenuContainer = $('#main-menu'),
            canvasContainer   = $('#canvas-container');

        menuIcon.click(function(){
            if( mainMenuContainer.css('right') ==  "-690px"){
                mainMenuContainer.css('right', '0px');
                canvasContainer.css('left', '-690px');
            }else {
                mainMenuContainer.css('right', '-690px');
                 canvasContainer.css('left', '0px');
            }
        });


        // Handle Game events.

        var gameOptionsContainer   = $('.game-option-group'),
            gameDifficultyElement  = $('#difficulty'),
            gameLifesElement       = $('#life-option'),
            gameTimeElement        = $('#time-option'),
            gameMusicElement       = $('#music-option'),
            gameCharacterContainer = $('#characters-container'),
            btnNewGame             = $('#btn-new-game');

        gameDifficultyElement.change(function(){
            game.toggleDifficulty( parseInt(gameDifficultyElement.val()));
            game.reset();
        });

        gameLifesElement.change(function(){
            game.toggleLifeOption();
            game.player.reset();
            game.live.lives = 3;
        });

        gameTimeElement.change(function(){
            game.toggleTimeOption();
        });

        gameMusicElement.change(function(){
            game.toggleMusic();
        });

        gameCharacterContainer.children().click(function(){

            var char = $(this)[0].dataset.character;

            $(this).siblings().removeClass('active');
            $(this).addClass("active");

            game.changeCharacter(char);

        });

        btnNewGame.click(function(){
            game.player.reset();
            game.score.points = 0;
            game.live.lives = 3;
        });

    });

})(jQuery);
