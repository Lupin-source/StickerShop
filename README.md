# Tutorial on how to set-up the project

## Getting Started
Hello, ito ang mga steps para maiset-up niyo ang project natin sa mga laptops/PC niyo. Alam ko naman na marunong na kayo paano iset-up ang inyong git sa mga laptops niyo,
if hindi niyo pa alam, ito muna ang basahin niyo para maset-up niyo ang Git.

[Git Documentation](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control)
<br/>
[Tutorial Video in Youtube](https://youtu.be/HkdAHXoRtos?si=IUjFZ3aJSUCudiy0)
<br/>
[Command Prompt Tutorials](https://youtube.com/playlist?list=PL6gx4Cwl9DGDV6SnbINlVUd0o2xT4JbMu&si=tWlbdzb4M92iknXw)

>[!NOTE]
> Paki-intindi muna ng mga binigay kong link para maunawaan niyo kung paano nagwowork ang Git at Github.

## Setting up the project
Ngayon na alam niyo na kung paano gamitin ang git, narito na ang mga steps kung paano iset-up ang **Case Study** natin.

1. Gumawa kayo ng folder sa `htdocs` folder niyo na matatagpuan niyo sa XAMPP folder natin.
>[!NOTE]
> Ang kadahilanan kung bakit doon tayo gagawa ng folder ay dahil gagamit tayo ng PHP at para magwork ang PHP ay kakailanganin nating iopen ang Apache at MYSQL sa XAMPP Control Panel natin.

2. I-setup ang GIT sa ginawang folder.
> [!TIP] 
> Great practice na rin if gagamit kayo ng __GIT BASH__ gawa nang mas madali siyang gamitin pero kung trip niyo ang __Command Prompt__ pwede din naman yon.

3. I-pull ang GitHub repository ng E-Commerce.

4. Once na mapull niyo na ang GitHub repository, i-open ang ginawang folder sa Visual Studio Code.

5. Buksan ang XAMPP Control Panel at iopen ang Apache pati ang MySQL.

6. Bumalik sa Visual Studio Code at gumawa ng terminal.
> [!TIP]
> Ang hotkey para makagawa ng Terminal ay pindutin ang <kbd>CTRL</kbd>+<kbd>SHIFT</kbd>+<kbd>`</kbd>

7. Pumunta sa directory ng my-react-app at itype sa terminal ang `npm install`

>[!IMPORTANT]
> Make sure na nasa directory kayo ng my-react-app sa terminal niyo. Baka kasi maidownload niyo ang mga node_module folders sa labas ng my-react-app.

8. Gumawa ulit ng terminal at papuntahin ang terminal sa my-project folder at itype sa terminal ang `composer install`.
>[!IMPORTANT]
> Make sure ulit na nasa directory kayo ng my-project sa terminal niyo. Baka maidownload niyo ang mga libraries ng laravel sa labas ng my-project.

9. Pindutin niyo ang folder ng my-project at ipangalan ang file na `.env`, i-copy ang nasa laman ng `.env.example` at ipaste ito sa ginawang `.env` file.
>[!IMPORTANT]
>  Crucial ang step na ito gawa nang hindi gagana ang backend nang wala ito. Ang file na ginawa niyo ay nagsisilbing command para makagawa ng database at makaaccess sa API ng Laravel.

10. I-type sa command ng ginawang terminal sa my-project folder ang `php artisan key:generate`
>[!IMPORTANT]
>  Crucial ang step na ito gawa nang hindi gagana ang backend nang wala ito.

11. Pumunta ulit sa ginawang terminal para sa my-project folder, itype doon ang command na `php artisan migrate` at pindutin ang <kbd>Enter</kbd>

12. After gawin ito, itype sa terminal ang command na `php artisan db:seed` at pindutin ang <kbd>Enter</kbd>

13. Pumunta sa ginawang terminal para sa my-react-app folder, itype sa terminal ang command na `npm start` para mapagana ang website.

14. Malalaman niyo ang username at password ng website kapag pumunta kayo sa folder ng seeders na matatagpuan sa loob ng database folder na naroroon sa my-project folder.

15. Kapag na-itype na ang username at password, makakapasok na kayo sa loob ng dashboard.

16. Pwede na kayong magsimula mag-design ng program.

## Tutorial Links for Learning
* [Git Documentation](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control)
* [Git Tutorial in Youtube](https://youtu.be/HkdAHXoRtos?si=IUjFZ3aJSUCudiy0)
* [Command Prompt Tutorials Playlist in Youtube](https://youtube.com/playlist?list=PL6gx4Cwl9DGDV6SnbINlVUd0o2xT4JbMu&si=tWlbdzb4M92iknXw)
* [Tutorial on Styling a React-Bootstrap Component](https://www.geeksforgeeks.org/how-to-add-custom-styles-to-react-bootstrap-components/)
* [Documentation on styling a React-Bootstrap Component](https://getbootstrap.com/docs/5.3/customize/overview/)
