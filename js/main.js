(function($){

    $(document).ready(function(){
        $('select').material_select();


        // Handle events.

        var gameOptionsContainer   = $('.game-option-group'),
            gameDifficultyElement  = $('#difficulty'),
            gameLifesElement       = $('#life-option'),
            gameTimeElement        = $('#time-option'),
            gameMusicElement       = $('#music-option'),
            gameCharacterContainer = $('#characters-container');

        gameDifficultyElement.change(function(){
            game.toggleDifficulty( parseInt(gameDifficultyElement.val()));
            game.reset();
        });

        gameLifesElement.change(function(){
            game.toggleLifeOption();
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

    });

})(jQuery);
