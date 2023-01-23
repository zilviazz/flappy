     
var ikanH=new Image();
ikanH.src="Image/ikanh.png";

var ikanL=new Image();
ikanL.src="Image/ikanl.png";

var BG=new Image();
        BG.src="Komponen/bg.png";

        var tang=new Image();
        tang.src="Image/Tiang.png";

        var tang1=new Image();
        tang1.src="Image/Tiang1.png";

        var ikanM=new Image();
        ikanM.src="Image/ikanm.png";

        var gelembungImg1=new Image();
        gelembungImg1.src="Image/gelembung1.png";

        var gelembungImg2=new Image();
        gelembungImg2.src="Image/gelembung2.png";

        var gelembungImg3=new Image();
        gelembungImg3.src="Image/gelembung3.png";

        let totalNyawa = 3;
        let skor=0;

        function refreshPage(){
            window.location.reload();
        }


        //Main nyawa

        function infoNyawa() {
                if(totalNyawa==3) {
                    document.getElementById("Nyawa1").style.display = "none";
                }
                else if(totalNyawa==2) {
                    document.getElementById("Nyawa2").style.display = "none";
 
                }
                else if(totalNyawa==1) {
                    document.getElementById("Nyawa3").style.display = "none";
                }
        }

var q=30;
var level=2;
var totalskor=0;
var naik=0;

        function mulaiKanvas() {

            var canvas = document.getElementById('canvas');
            var ctx=canvas.getContext('2d');

            canvas.width=canvas.scrollWidth;//mengembalikan lebar element
            canvas.height=canvas.scrollHeight;//mengembalikan tinggi elemen

            var cW=canvas.width;
            var cH=canvas.height;

            var  bgx=0,start=false,z=250;

            function splash() {
                ctx.clearRect(0,0,cW,cH);
                ctx.drawImage(BG,bgx-=2,0);
                if(bgx==-1598) {
                    bgx=0;
                }
                ctx.font="Bold 50px arial";
                ctx.fillText("Flappy Fish",260,200);

                ctx.font="Bold 20px arial";
                ctx.fillText("Click Untuk Memulai",300,400);
                    
                ctx.drawImage(ikanH,370,z+=2);

                if(z>=300) {
                    z=250;
                }

            }//fungsi yang pertama kali dijalankan 

            var inSplash=setInterval(splash,30);

            document.addEventListener('click',function(event) {
                if(start==false) {
                    start=true;
                    clearInterval(inSplash);
                    utama();
                }
            }) 

            function utama() {

                function background() {
                    this.x=0;
                    this.render=function() {
                        ctx.drawImage(BG,this.x--,0);//membuat gambar bg, -- agar gambarnya berjalan ke sebelah kiri
                        if(this.x==-1599) {
                            this.x=0;
                        }//membuat gambar berulang
                    }
                }//untuk membuat blueprint bg

                var latar=new background();//objek untuk bg


                //--------------------------------------------BUBLE
                var g=600, j=500,l=400;

                function Bubble1(){
                    ctx.drawImage(gelembungImg1, 200, g-=2);
                    ctx.drawImage(gelembungImg2, 230, j-=2);
                    ctx.drawImage(gelembungImg3, 250, l-=2);
                    if(g<=300){
                        g=600;
                    }
                    else if(j<=300){
                        j=600;
                    }
                    else if(l<=300){
                        l=600;
                    }
                }
                
                var g=600, j=500,l=400;
                
                function Bubble2(){
                    ctx.drawImage(gelembungImg1, 650, g-=2);
                    ctx.drawImage(gelembungImg2, 630, j-=2);
                    ctx.drawImage(gelembungImg3, 600, l-=2);
                    if(g<=300){
                        g=600;
                    }
                    else if(j<=300){
                        j=600;
                    }
                    else if(l<=300){
                        l=600;
                    }
                }
                //---------------------------------------BUBLE

                var gantiGambar=false;

                function Karakter() {
                    this.x=100, this.y=200, this.w=50,this.h=50,this.i=0;

                    this.render=function() {
                        if(gantiGambar) {
                            ctx.drawImage(ikanL,this.x,this.y+=5); //cetak gambar ikan keatas
                            this.i++;
                            if(this.i==5) {
                                gantiGambar=false;
                                this.i=0;
                            }
                        }//dalam hitungan 5 dia ke bawah
                        else {
                            ctx.drawImage(ikanH,this.x,this.y+=5);//agar turun maka y nya ditambahkan 5, agar ikannya selalu turun ke bawah
                        }
                    }//proses percetakan gambar pada canvas
                }

                var karakter = new Karakter();//objek untuk karakter

                var tiang=[];

                tambahTiang();//membuat satu buah ubur

                function tambahTiang() {
                    var x=800,y=0,w=100,h=250;
                    var random=Math.floor(Math.random()*150);//angka random untuk y
                    tiang.push({"x":x,"y":y-random,"w":w,"h":h});//menambah data array baru dalam variabel tiang
                }

                var hitung=0;

                function rendertiang() {
                    for(var i=0;i<tiang.length;i++) {
                        var t=tiang[i];//variabel baru
                        ctx.drawImage(tang,t.x--,t.y);//x yg data di dalamnya array, y nya angka acak, untuk ubur
                        ctx.drawImage(tang1,t.x--,t.y+t.h+200);//untuk coral

                        if(t.x+t.w<0) {
                            tiang.splice(i,1);//ubur dan coral ke i dan yang dihapus 1
                            tambahNilai=true;//buatskor
                        }

                    }
                    hitung++;
                    if(hitung==150) {
                        tambahTiang();
                        hitung=0;
                    }
                }//mencetak ubur dan coral,  menjalankan dari kanan ke kiri

                function selesai() {
                    clearInterval(interval,q);
                    ctx.clearRect(0,0,cW,cH);
                    latar.render();
                    rendertiang();
                    ctx.drawImage(ikanM,karakter.x,karakter.y);


                    ctx.fillStyle="#FF914D";
                    ctx.fillRect(190,180,420,200);
                    

                    ctx.font="60px Greta Display Std";
                    ctx.fillStyle = "#FFFFFF";
                    ctx.fillText("GAME OVER",220,250);

                    ctx.font="22px arial";
                    ctx.fillStyle = "#000000";
                    ctx.fillText("Skor Anda adalah : "+totalskor,300,300);

                    ctx.font="16px arial";
                    ctx.fillStyle = "#FFFFFF";
                    ctx.fillText("PLAY AGAIN",350,350);

                    ctx.canvas.addEventListener('dblclick',function(event) {
                        window.location="Flappy_Fish.html";
                    })
                    
                }

                tambahNilai=true;
                function tambahSkor() {
                    skor++;
                    totalskor++;
                    document.getElementById("Scoreview").innerHTML = totalskor;
                }

                function kena() {
                    for(var i=0;i<tiang.length;i++) {
                        var t=tiang[i];
                        if((karakter.x+karakter.w>t.x && karakter.y+80<t.y+t.h && karakter.x<t.x+t.w) ||
                            (karakter.x+karakter.w>t.x && karakter.y+karakter.h>t.y+t.h+200 && karakter.x<t.x+t.w)) {
                                if(totalNyawa==0) {
                                    selesai();
                                 }
                                else {
                                    infoNyawa();
                                    clearInterval(interval);
                                    ctx.clearRect(0,0,cW,cH);
                                    latar.render();
                                    rendertiang();
                                    ctx.drawImage(ikanM,karakter.x,karakter.y);
                                    alert("Skor Terakhir anda "+skor +" Dan anda masih Mempunyai "+totalNyawa+ " Nyawa");
                                    totalNyawa--;
                                    utama();
                                }
                                
                        }
                        else if(t.x+t.w<karakter.x) {
                            if(tambahNilai) {
                                tambahSkor();
                                tambahNilai=false;
                            }
                        }
                    }
                    if(karakter.y+30<=0) {
                        if(totalNyawa==0) {
                            selesai();
                        }
                        else {
                            infoNyawa();
                            clearInterval(interval);
                            ctx.clearRect(0,0,cW,cH);
                            latar.render();
                            rendertiang();
                            ctx.drawImage(ikanM,karakter.x,karakter.y);
                            window.alert("Skor Terakhir anda "+skor +" Dan anda masih Mempunyai "+totalNyawa+ " Nyawa");
                            totalNyawa--;
                            utama();
                        }
                        
                    }
                    if(karakter.y+karakter.h>cH) {
                        if(totalNyawa==0) {
                            selesai();
                        }
                        else {
                            infoNyawa();
                            clearInterval(interval);
                            ctx.clearRect(0,0,cW,cH);
                            latar.render();
                            rendertiang();
                            ctx.drawImage(ikanM,karakter.x,karakter.y);
                            window.alert("Skor Terakhir anda "+skor +" Dan anda masih Mempunyai "+totalNyawa+ " Nyawa");
                            totalNyawa--;
                            utama();
                        }
                    }

                }



                //FUNGSI MENAMBAH LEVEL
                function nextlevel() {
                    if(skor>skor%2==1) {
                        clearInterval(interval);
                        ctx.clearRect(0,0,cW,cH);
                        latar.render();
                        rendertiang();
                        ctx.drawImage(ikanM,karakter.x,karakter.y);
                        window.alert("Anda Memasuki Level "+level);
                        level++;
                        skor=0;

                        if(q==5) {
                        }
                        else if(q<=10) {
                            q--;
                        }
                        else {
                            q-=5;
                        }

                        if(level==4) {
                            naik+=40;
                        }
                        utama();
                    }
                }



                function animasi() {
                    ctx.save();
                    ctx.clearRect(0,0,cW,cH);
                    latar.render();
                    karakter.render();
                    rendertiang();
                    Bubble1();
                    Bubble2();
                    kena();
                    nextlevel();
                    // ctx.font="Normal 30px arial";
                    ctx.restore();
                }


                var interval = setInterval(animasi,q);


            
               

                ctx.canvas.addEventListener('click',function(event){
                    karakter.y-=70+naik;
                    gantiGambar=true;
                })


            }//end utama

        } 

window.addEventListener('load',function(event) {
            mulaiKanvas();
})
    