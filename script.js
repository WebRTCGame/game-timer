        /*jshint camelcase: true, browser:true, maxlen: 100, curly: true, eqeqeq: true, immed: true, latedef: true, noarg: true, noempty: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, maxdepth: 3, maxstatements:20, maxcomplexity: 5 */
        /* global $:true, Segment:true, PIXI:true */

        import {
            tC
        }
        from './anim';
        import {
            Timer
        }
        from './timer';
        import {
            Bone
        }
        from './Bone';


        function rgbToHex(r, g, b) {
            return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        }

        function cl(r, g, b) {
            return PIXI.utils.rgb2hex([~~r, ~~g, ~~b]);
        }

        function randomIntFromInterval(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        var renderer = new PIXI.WebGLRenderer(700, 600);
        document.body.appendChild(renderer.view);
        var stage = new PIXI.Container();
        stage.interactive = true;
        var style = {
            font: '24px Arial bold italic',
            fill: rgbToHex(255, 255, 255),
            stroke: rgbToHex(0, 0, 0),
            strokeThickness: 5,
            //dropShadow: false,
            //dropShadowColor: '#000000',
            // dropShadowAngle: Math.PI / 6,
            // dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440
        };

        var richText = new PIXI.Text('Rich text with a lot of options and across multiple lines', style);
        richText.x = 30;
        richText.y = 180;

        stage.addChild(richText);
        var graphics = new PIXI.Graphics();
        stage.addChild(graphics);

        var graphics1 = new PIXI.Graphics();
        graphics1.lineStyle(2, 0x0000FF, 1);
        stage.addChild(graphics1);

        var graphics2 = new PIXI.Graphics();
        graphics2.lineStyle(2, 0xff0000, 1);
        stage.addChild(graphics2);

        var graphics3 = new PIXI.Graphics();
        stage.addChild(graphics3);
        graphics3.lineStyle(2, 0x0000FF, 1);
        graphics3.drawRect(0, 0, 100, 20);
        graphics3.pivot.y = 10;


        var graphics4 = new PIXI.Graphics();
        stage.addChild(graphics4);
        graphics4.lineStyle(2, 0xFF0000, 1);
        graphics4.drawRect(0, 0, 100, 20);
        graphics4.pivot.y = 10;

        var position = {
                x: 100,
                y: 300,
                width: 100
            },
            position2 = {
                x: 200,
                y: 300,
                width: 100
            },
            segment0 = new Segment(100, 20),
            segment1 = new Segment(100, 20),
            highHit = {
                x: 400,
                y: 200
            },
            medHit = {
                x: 400,
                y: 250
            },
            lowHit = {
                x: 400,
                y: 300
            },
            segments = [],
            numSegments = 5,
            spineLen = 35,
            target;

        /*
        var snakeContainer = new PIXI.DisplayObjectContainer();
        	snakeContainer.position.x = 300;
        	snakeContainer.position.y = 300;
                var points = [];
                points.push(new PIXI.Point(segment0.x, segment0.y));
                points.push(new PIXI.Point(segment0.pinX(), segment0.pinY()));
                points.push(new PIXI.Point(segment1.pinX(), segment1.pinY()));

                var strip = new PIXI.Rope(PIXI.Texture.fromImage("snake.png"), points);
                strip.x = -300;
                
                stage.addChild(snakeContainer);
                snakeContainer.addChild(strip);
        */
        function reach(segment, xpos, ypos) {
            var dx = xpos - segment.x,
                dy = ypos - segment.y;
            segment.rotation = Math.atan2(dy, dx);
            var w = segment.getPin().x - segment.x,
                h = segment.getPin().y - segment.y;
            return {
                x: xpos - w,
                y: ypos - h
            };
        }

        function position(segmentA, segmentB) {
            segmentA.x = segmentB.getPin().x;
            segmentA.y = segmentB.getPin().y;
        };

        function move(segment, i) {
            if (i !== 0) {
                target = reach(segment, target.x, target.y);
                segments[i - 1].x = segment.pinX();
                segments[i - 1].y = segment.pinY();
            }
        };

        function draw(segment) {
            segment.render(ctx);
        }

        function btnClick(id, fnc) {
            document.getElementById(id).addEventListener("click", fnc, false);
        };

        var timer = new Timer({
            h: 0,
            m: 5,
            s: 10
        });

        //window.onload = function() {
        var c = document.getElementById("fun");
        var ctx = c.getContext("2d");

        while (numSegments--) {
            segments.push(new Segment(spineLen, 10));
        }
        segments[segments.length - 1].x = 200;
        segments[segments.length - 1].y = 400;
        segments[segments.length - 1].color = 'green';




        segment0.color = 'red';
        segment1.color = 'blue';


        segment1.x = 205; //c.width / 2;
        segment1.y = 250; //c.height / 2;




        timer.when = function(newValue) {
            if (Math.round(newValue) >= Math.round(timer.HMStoS({
                    h: 0,
                    m: 5,
                    s: 15
                }))) {
                timer.reset();
            }
        };

        timer.onTick = function() {
            //console.log(timer.ticks)
        };


        const equateA = (a, b, c) => {
            return Math.acos((b * b - a * a - c * c) / (-2 * a * c));
        };


        const equateB = (a, b, c) => {
            return Math.acos((c * c - a * a - b * b) / (-2 * a * b));
        };

        let count = 0;

        function update(tframe) {
            var dt = tC.getDT(tframe);

            timer.step();
            TWEEN.update(tframe);
            segment0.width = position.width;
            segment1.width = position2.width;
            segment1.x = position2.x;
            segment1.y = position2.y;
            segments[segments.length - 1].x = segment1.x;
            segments[segments.length - 1].y = 400; //segment1.y + (numSegments*spineLen);
            var dx = position.x - segment1.x,
                dy = position.y - segment1.y,
                dist = Math.sqrt(dx * dx + dy * dy),
                a = 100,
                b = 100,
                c = Math.min(dist, a + b),
                B = equateA(a, b, c), //Math.acos((b * b - a * a - c * c) / (-2 * a * c)),
                C = equateB(a, b, c), //Math.acos((c * c - a * a - b * b) / (-2 * a * b)),
                D = Math.atan2(dy, dx),
                E = D + B + Math.PI + C;

            segment1.rotation = (D + B);

            //var target = segment1.getPin();
            segment0.x = segment1.pinX(); //target.x;
            segment0.y = segment1.pinY(); //target.y;
            segment0.rotation = E;

            /*
            var dx = mouse.x - segment1.x,
                        dy = mouse.y - segment1.y,
                        dist = Math.sqrt(dx * dx + dy * dy),
                        a = 100,
                        b = 100,
                        c = Math.min(dist, a + b),
                        B = Math.acos((b * b - a * a - c * c) / (-2 * a * c)),
                        C = Math.acos((c * c - a * a - b * b) / (-2 * a * b)),
                        D = Math.atan2(dy, dx),
                        E = D - B + Math.PI - C;
                    
                    segment1.rotation = (D - B);

                    var target = segment1.getPin();
                    segment0.x = target.x;
                    segment0.y = target.y;
                    segment0.rotation = E;
            */

            target = reach(segments[0], position2.x, position2.y);
            segments.forEach(move);
            //game logic here
            //count += 0.1;
            //graphics2.rotation = count * 0.1;
            /*
            graphics1.rotation = segment1.rotation;
            graphics1.position.x = segment1.x;
            graphics1.position.y = segment1.y;

            graphics2.rotation = segment0.rotation;
            graphics2.position.x = segment0.x;
            graphics2.position.y = segment0.y;
*/
            /*
                        points[0].x = segment0.x;
                        points[0].y = segment0.y;
                        points[1].x = segment0.pinX();
                        points[1].y = segment0.pinY();
                        points[2].x = segment1.pinX();
                        points[2].y = segment1.pinY();
                        */

            graphics3.position.x = segment0.x;
            graphics3.position.y = segment0.y;
            graphics3.rotation = segment0.rotation;
            
            graphics4.position.x = segment1.x;
            graphics4.position.y = segment1.y;
            graphics4.rotation = segment1.rotation;
            
        }

        function animate(tframe) {

            requestAnimationFrame(animate);
            update(tframe);
            render();

        }

        function render() {
            //ctx.fillStyle = 'rgba(255,255,255,1)';
            ctx.clearRect(0, 0, c.width, c.height);
            ctx.fillStyle = 'black';
            ctx.font = "12px Georgia";
            //ctx.fillText(Date.now(), 10, 50);
            ctx.save();
            if (tC.fps < 60) {
                ctx.fillStyle = 'red';
            };
            ctx.fillText("FPS: " + tC.fps, c.width - 50, 10);
            ctx.restore();

            ctx.font = "20px Georgia";
            ctx.fillText(timer.ticks, 10, 30);
            ctx.fillText(timer.getHMSObj(), 10, 60);


            segment1.render(ctx);
            segment0.render(ctx);
            ctx.save();

            ctx.beginPath();
            ctx.arc(position.x, position.y, 20, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(0,255,0,0.25)';
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#003300';
            ctx.stroke();
            ctx.restore();

            ctx.save();
            ctx.beginPath();
            ctx.arc(highHit.x, highHit.y, 20, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(255,0,0,0.25)';
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'red';
            ctx.stroke();
            ctx.restore();

            ctx.save();
            ctx.beginPath();
            ctx.arc(medHit.x, medHit.y, 20, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(0,255,0,0.25)';
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'green';
            ctx.stroke();
            ctx.restore();

            ctx.save();
            ctx.beginPath();
            ctx.arc(lowHit.x, lowHit.y, 20, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(0,0,255,0.25)';
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'blue';
            ctx.stroke();
            ctx.restore();

            segments.forEach(draw);
            richText.text = timer.ticks;

            graphics.clear();
            graphics.lineStyle(2, 0xff0000, 1);
            graphics.drawCircle(segment0.x, segment0.y, 10);
            graphics.drawCircle(segment0.pinX(), segment0.pinY(), 10);
            graphics.lineStyle(2, 0x0000ff, 1);
            graphics.drawCircle(segment1.x, segment1.y, 10);
            graphics.drawCircle(segment1.pinX(), segment1.pinY(), 10);

            graphics.lineStyle(2, 0x00ff00, 1);
            graphics.drawCircle(highHit.x, highHit.y, 10);
            graphics.drawCircle(medHit.x, medHit.y, 10);
            graphics.drawCircle(lowHit.x, lowHit.y, 10);


            graphics1.clear();
            graphics1.lineStyle(2, 0xff0000, 1);
            graphics1.moveTo(segment0.x, segment0.y);
            graphics1.lineTo(segment0.pinX(), segment0.pinY());

            graphics2.clear();
            graphics2.lineStyle(2, 0x0000ff, 1);
            graphics2.moveTo(segment1.x, segment1.y);
            graphics2.lineTo(segment1.pinX(), segment1.pinY());

            renderer.render(stage);
        };

        function init() {



            btnClick("btnStart", function() {
                timer.start();
            });
            btnClick("btnStop", function() {
                timer.stop();
            });
            btnClick("btnPause", function() {
                timer.pause();
            });
            btnClick("btnReset", function() {
                timer.reset();
            });
            btnClick("btnReverse", function() {
                timer.increment = !timer.increment;
            });



            var tweenHighHit = new TWEEN.Tween(position)
                .to({
                    x: highHit.x,
                    y: highHit.y,
                    width: 100
                }, 2000)
                .easing(TWEEN.Easing.Elastic.InOut)
                //.repeat(0)
                .delay(1000)
                //.onUpdate(function() {})
                //.onStart(function() {})
                //.onStop(function() {})
                .onComplete(function() {
                    tweenReset.start();
                });

            var tweenMedHit = new TWEEN.Tween(position)
                .to({
                    x: medHit.x,
                    y: medHit.y,
                    width: 100
                }, 2000)
                .easing(TWEEN.Easing.Elastic.InOut)
                //.repeat(0)
                .delay(1000)
                //.onUpdate(function() {})
                //.onStart(function() {})
                //.onStop(function() {})
                .onComplete(function() {
                    tweenReset.start();
                });

            var tweenLowHit = new TWEEN.Tween(position)
                .to({
                    x: lowHit.x,
                    y: lowHit.y,
                    width: 100
                }, 2000)
                .easing(TWEEN.Easing.Elastic.InOut)
                //.repeat(0)
                .delay(1000)
                //.onUpdate(function() {})
                //.onStart(function() {})
                //.onStop(function() {})
                .onComplete(function() {
                    tweenReset.start();
                });

            var tweenReset = new TWEEN.Tween(position)
                .to({
                    x: 275,
                    y: 325,
                    width: 100
                }, 1000)
                .easing(TWEEN.Easing.Back.InOut)
                .repeat(0)
                .delay(0)
                //.onUpdate(function() {})
                .onStart(function() {
                    //TW_Seg0Len.start();
                })
                .onStop(function() {})
                .onComplete(function() {
                    var rand = randomIntFromInterval(0, 2);
                    if (rand === 0) {
                        tweenHighHit.start();
                    }
                    else if (rand === 1) {
                        tweenMedHit.start();
                    }
                    else if (rand === 2) {
                        tweenLowHit.start();
                    }
                    //tween2.start();
                });
            //tween.chain(tween2);
            //tween2.chain(tween);
            tweenReset.start();


            var tween3 = new TWEEN.Tween(position2)
                .to({
                    x: 200,
                    y: 250
                }, 1000)
                .easing(TWEEN.Easing.Back.InOut)
                .repeat(Infinity)
                .delay(0)
                .yoyo(true)
                //.onUpdate(function() {})
                .onStart(function() {})
                .onStop(function() {})
                .onComplete(function() {
                    //tween2.start();
                });
            tween3.start();

            animate(0);
        }


        init();