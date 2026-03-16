"""
python manage.py seed_data
Creates sample categories, lessons, words and exercises.
"""
from django.core.management.base import BaseCommand
from kurdish_learning.apps.lessons.models import Category, Lesson, Word
from kurdish_learning.apps.exercises.models import Exercise, Choice
class Command(BaseCommand):
    help = 'Creates sample lesson data (A1-B2)'

    def handle(self, *args, **kwargs):
        self.stdout.write('🌱 Creating seed data...')
        # A1 lessons
        self._create_animals()
        self._create_colors()
        self._create_numbers()
        self._create_family()
        self._create_greetings()
        self._create_body()
        self._create_food()
        # A2 lessons
        self._create_days_time()
        self._create_house()
        self._create_clothing()
        self._create_nature()
        # B1 lessons
        self._create_emotions()
        self._create_professions()
        self._create_travel()
        # B2 lessons
        self._create_advanced_verbs()
        self._create_society()
        self.stdout.write(self.style.SUCCESS('✅ All seed data created!'))

    def _make_exercises(self, lesson, exercises_data):
        """Helper: creates exercises with choices."""
        for i, ex_data in enumerate(exercises_data):
            ex = Exercise.objects.create(
                lesson=lesson,
                exercise_type='multiple_choice',
                question_lang=ex_data['lang'],
                question=ex_data['q'],
                order=i + 1,
                stars=ex_data.get('stars', 1),
            )
            for text, correct in ex_data['choices']:
                Choice.objects.create(
                    exercise=ex,
                    lang=ex_data.get('choice_lang', ex_data['lang']),
                    text=text,
                    is_correct=correct,
                )

    # ========================= A1 LESSONS ========================= #

    def _create_animals(self):
        cat, _ = Category.objects.get_or_create(
            name_kmr='Ajal', defaults={'name_de': 'Tiere', 'name_en': 'Animals', 'icon': '🐾', 'order': 1}
        )
        lesson, created = Lesson.objects.get_or_create(
            title_kmr='Ajalên malê',
            defaults={
                'category': cat,
                'title_de': 'Haustiere', 'title_en': 'Pets',
                'description_de': 'Lerne die Namen der Haustiere auf Kurmanci.',
                'description_en': 'Learn the names of pets in Kurmanji.',
                'level': 1, 'order': 1,
            }
        )
        if not created:
            return

        words = [
            ('kûçik', 'k-uu-chik', 'Hund', 'dog'),
            ('pisîk', 'pi-seek', 'Katze', 'cat'),
            ('hesp', 'hesp', 'Pferd', 'horse'),
            ('çêl', 'chel', 'Kuh', 'cow'),
            ('mî', 'mee', 'Schaf', 'sheep'),
            ('mirîşk', 'mi-reeshk', 'Huhn', 'chicken'),
            ('ker', 'ker', 'Esel', 'donkey'),
            ('bizin', 'bi-zin', 'Ziege', 'goat'),
        ]
        for i, (kmr, pron, de, en) in enumerate(words):
            Word.objects.create(lesson=lesson, kmr=kmr, pronunciation=pron, de=de, en=en, order=i)

        self._make_exercises(lesson, [
            {'lang': 'de', 'q': 'Was bedeutet "kûçik" auf Deutsch?',
             'choices': [('Hund', True), ('Katze', False), ('Pferd', False), ('Kuh', False)]},
            {'lang': 'de', 'q': 'Wie sagt man "Katze" auf Kurmanci?', 'choice_lang': 'kmr',
             'choices': [('pisîk', True), ('kûçik', False), ('hesp', False), ('mî', False)]},
            {'lang': 'en', 'q': 'How do you say "horse" in Kurmanji?', 'choice_lang': 'kmr',
             'choices': [('hesp', True), ('mî', False), ('çêl', False), ('mirîşk', False)], 'stars': 2},
            {'lang': 'de', 'q': 'Was bedeutet "bizin"?',
             'choices': [('Ziege', True), ('Esel', False), ('Schaf', False), ('Huhn', False)]},
            {'lang': 'en', 'q': 'What does "mirîşk" mean?',
             'choices': [('chicken', True), ('cow', False), ('goat', False), ('donkey', False)]},
        ])
        self.stdout.write('  ✅ Animals lesson created')

    def _create_colors(self):
        cat, _ = Category.objects.get_or_create(
            name_kmr='Reng', defaults={'name_de': 'Farben', 'name_en': 'Colors', 'icon': '🎨', 'order': 2}
        )
        lesson, created = Lesson.objects.get_or_create(
            title_kmr='Rengên bingehîn',
            defaults={
                'category': cat,
                'title_de': 'Grundfarben', 'title_en': 'Basic Colors',
                'description_de': 'Lerne die Grundfarben auf Kurmanci.',
                'description_en': 'Learn basic colors in Kurmanji.',
                'level': 1, 'order': 1,
            }
        )
        if not created:
            return

        words = [
            ('sor', 'sor', 'rot', 'red'),
            ('şîn', 'sheen', 'blau', 'blue'),
            ('kesk', 'kesk', 'grün', 'green'),
            ('zer', 'zer', 'gelb', 'yellow'),
            ('spî', 'spee', 'weiß', 'white'),
            ('reş', 'resh', 'schwarz', 'black'),
            ('mor', 'mor', 'lila', 'purple'),
            ('porteqalî', 'por-te-ka-lee', 'orange', 'orange'),
            ('pembê', 'pem-be', 'rosa', 'pink'),
            ('qehweyî', 'keh-we-yee', 'braun', 'brown'),
        ]
        for i, (kmr, pron, de, en) in enumerate(words):
            Word.objects.create(lesson=lesson, kmr=kmr, pronunciation=pron, de=de, en=en, order=i)

        self._make_exercises(lesson, [
            {'lang': 'de', 'q': 'Was bedeutet "sor" auf Deutsch?',
             'choices': [('rot', True), ('blau', False), ('grün', False), ('gelb', False)]},
            {'lang': 'en', 'q': 'How do you say "blue" in Kurmanji?', 'choice_lang': 'kmr',
             'choices': [('şîn', True), ('kesk', False), ('zer', False), ('sor', False)]},
            {'lang': 'de', 'q': 'Wie sagt man "grün" auf Kurmanci?', 'choice_lang': 'kmr',
             'choices': [('kesk', True), ('şîn', False), ('spî', False), ('mor', False)], 'stars': 2},
            {'lang': 'en', 'q': 'What does "reş" mean?',
             'choices': [('black', True), ('white', False), ('brown', False), ('purple', False)]},
            {'lang': 'de', 'q': 'Was bedeutet "pembê"?',
             'choices': [('rosa', True), ('lila', False), ('orange', False), ('braun', False)]},
        ])
        self.stdout.write('  ✅ Colors lesson created')

    def _create_numbers(self):
        cat, _ = Category.objects.get_or_create(
            name_kmr='Hejmar', defaults={'name_de': 'Zahlen', 'name_en': 'Numbers', 'icon': '🔢', 'order': 3}
        )
        lesson, created = Lesson.objects.get_or_create(
            title_kmr='Hejmarên 1-10',
            defaults={
                'category': cat,
                'title_de': 'Zahlen 1-10', 'title_en': 'Numbers 1-10',
                'description_de': 'Lerne die Zahlen von 1 bis 10 auf Kurmanci.',
                'description_en': 'Learn numbers 1 to 10 in Kurmanji.',
                'level': 1, 'order': 1,
            }
        )
        if not created:
            return

        words = [
            ('yek', 'yek', 'eins', 'one'),
            ('du', 'du', 'zwei', 'two'),
            ('sê', 'se', 'drei', 'three'),
            ('çar', 'char', 'vier', 'four'),
            ('pênc', 'pench', 'fünf', 'five'),
            ('şeş', 'shesh', 'sechs', 'six'),
            ('heft', 'heft', 'sieben', 'seven'),
            ('heşt', 'hesht', 'acht', 'eight'),
            ('neh', 'neh', 'neun', 'nine'),
            ('deh', 'deh', 'zehn', 'ten'),
        ]
        for i, (kmr, pron, de, en) in enumerate(words):
            Word.objects.create(lesson=lesson, kmr=kmr, pronunciation=pron, de=de, en=en, order=i)

        self._make_exercises(lesson, [
            {'lang': 'de', 'q': 'Was bedeutet "pênc"?',
             'choices': [('fünf', True), ('sechs', False), ('vier', False), ('sieben', False)]},
            {'lang': 'en', 'q': 'How do you say "three" in Kurmanji?', 'choice_lang': 'kmr',
             'choices': [('sê', True), ('du', False), ('çar', False), ('yek', False)]},
            {'lang': 'de', 'q': 'Wie viel ist "heşt"?',
             'choices': [('8', True), ('6', False), ('9', False), ('7', False)], 'stars': 2},
            {'lang': 'en', 'q': 'What number is "deh"?',
             'choices': [('10', True), ('8', False), ('9', False), ('7', False)]},
            {'lang': 'de', 'q': 'Was bedeutet "şeş"?',
             'choices': [('sechs', True), ('sieben', False), ('fünf', False), ('acht', False)]},
        ])

        # Second numbers lesson: 11-20
        lesson2, created2 = Lesson.objects.get_or_create(
            title_kmr='Hejmarên 11-20',
            defaults={
                'category': cat,
                'title_de': 'Zahlen 11-20', 'title_en': 'Numbers 11-20',
                'description_de': 'Lerne die Zahlen von 11 bis 20.',
                'description_en': 'Learn numbers 11 to 20.',
                'level': 2, 'order': 2,
            }
        )
        if created2:
            words2 = [
                ('yazde', 'yaz-de', 'elf', 'eleven'),
                ('dwazde', 'dwaz-de', 'zwölf', 'twelve'),
                ('sêzde', 'sez-de', 'dreizehn', 'thirteen'),
                ('çarde', 'char-de', 'vierzehn', 'fourteen'),
                ('pazde', 'paz-de', 'fünfzehn', 'fifteen'),
                ('şazde', 'shaz-de', 'sechzehn', 'sixteen'),
                ('hivde', 'hiv-de', 'siebzehn', 'seventeen'),
                ('hijde', 'hij-de', 'achtzehn', 'eighteen'),
                ('nozde', 'noz-de', 'neunzehn', 'nineteen'),
                ('bîst', 'beest', 'zwanzig', 'twenty'),
            ]
            for i, (kmr, pron, de, en) in enumerate(words2):
                Word.objects.create(lesson=lesson2, kmr=kmr, pronunciation=pron, de=de, en=en, order=i)

            self._make_exercises(lesson2, [
                {'lang': 'de', 'q': 'Was bedeutet "bîst"?',
                 'choices': [('zwanzig', True), ('fünfzehn', False), ('achtzehn', False), ('dreizehn', False)]},
                {'lang': 'en', 'q': 'How do you say "twelve" in Kurmanji?', 'choice_lang': 'kmr',
                 'choices': [('dwazde', True), ('yazde', False), ('sêzde', False), ('çarde', False)]},
                {'lang': 'en', 'q': 'What number is "pazde"?',
                 'choices': [('15', True), ('16', False), ('14', False), ('17', False)], 'stars': 2},
                {'lang': 'de', 'q': 'Was bedeutet "nozde"?',
                 'choices': [('neunzehn', True), ('siebzehn', False), ('achtzehn', False), ('sechzehn', False)]},
            ])

        self.stdout.write('  ✅ Numbers lessons created')

    def _create_family(self):
        cat, _ = Category.objects.get_or_create(
            name_kmr='Malbat', defaults={'name_de': 'Familie', 'name_en': 'Family', 'icon': '👨‍👩‍👧', 'order': 4}
        )
        lesson, created = Lesson.objects.get_or_create(
            title_kmr='Endamên malbatê',
            defaults={
                'category': cat,
                'title_de': 'Familienmitglieder', 'title_en': 'Family members',
                'description_de': 'Lerne die Familienmitglieder auf Kurmanci.',
                'description_en': 'Learn family member words in Kurmanji.',
                'level': 1, 'order': 1,
            }
        )
        if not created:
            return

        words = [
            ('bav', 'bav', 'Vater', 'father'),
            ('dê', 'de', 'Mutter', 'mother'),
            ('bira', 'bi-ra', 'Bruder', 'brother'),
            ('xwişk', 'khwishk', 'Schwester', 'sister'),
            ('bapîr', 'ba-peer', 'Großvater', 'grandfather'),
            ('dapîr', 'da-peer', 'Großmutter', 'grandmother'),
            ('kur', 'kur', 'Sohn', 'son'),
            ('keç', 'kech', 'Tochter', 'daughter'),
            ('mam', 'mam', 'Onkel (väterlicherseits)', 'uncle (paternal)'),
            ('xal', 'khal', 'Onkel (mütterlicherseits)', 'uncle (maternal)'),
        ]
        for i, (kmr, pron, de, en) in enumerate(words):
            Word.objects.create(lesson=lesson, kmr=kmr, pronunciation=pron, de=de, en=en, order=i)

        self._make_exercises(lesson, [
            {'lang': 'de', 'q': 'Was bedeutet "bav" auf Deutsch?',
             'choices': [('Vater', True), ('Mutter', False), ('Bruder', False), ('Sohn', False)]},
            {'lang': 'en', 'q': 'How do you say "sister" in Kurmanji?', 'choice_lang': 'kmr',
             'choices': [('xwişk', True), ('bira', False), ('keç', False), ('dê', False)]},
            {'lang': 'de', 'q': 'Wie sagt man "Großmutter" auf Kurmanci?', 'choice_lang': 'kmr',
             'choices': [('dapîr', True), ('bapîr', False), ('dê', False), ('xwişk', False)], 'stars': 2},
            {'lang': 'en', 'q': 'What does "kur" mean?',
             'choices': [('son', True), ('daughter', False), ('brother', False), ('father', False)]},
            {'lang': 'de', 'q': 'Was bedeutet "xal"?',
             'choices': [('Onkel (mütterlicherseits)', True), ('Onkel (väterlicherseits)', False), ('Großvater', False), ('Sohn', False)]},
        ])
        self.stdout.write('  ✅ Family lesson created')

    def _create_greetings(self):
        cat, _ = Category.objects.get_or_create(
            name_kmr='Silav û Gotinên Rojane', defaults={'name_de': 'Begrüßung & Alltag', 'name_en': 'Greetings & Daily', 'icon': '👋', 'order': 5}
        )
        lesson, created = Lesson.objects.get_or_create(
            title_kmr='Silav û xatirxwestin',
            defaults={
                'category': cat,
                'title_de': 'Begrüßung & Verabschiedung', 'title_en': 'Greetings & Farewells',
                'description_de': 'Grundlegende Begrüßungen und Alltagsphrasen.',
                'description_en': 'Basic greetings and everyday phrases.',
                'level': 1, 'order': 1,
            }
        )
        if not created:
            return

        words = [
            ('silav', 'si-lav', 'Hallo', 'hello'),
            ('oxir be', 'o-khir be', 'Auf Wiedersehen', 'goodbye'),
            ('spas', 'spas', 'Danke', 'thank you'),
            ('bibore', 'bi-bo-re', 'Entschuldigung', 'sorry / excuse me'),
            ('erê', 'e-re', 'Ja', 'yes'),
            ('na', 'na', 'Nein', 'no'),
            ('baş e', 'bash e', 'Gut', 'good / okay'),
            ('rojbaş', 'roj-bash', 'Guten Tag', 'good day'),
            ('şevbaş', 'shev-bash', 'Gute Nacht', 'good night'),
            ('bi xêr hatî', 'bi kher ha-tee', 'Willkommen', 'welcome'),
            ('çawa yî?', 'cha-wa yee', 'Wie geht es dir?', 'how are you?'),
            ('ez baş im', 'ez bash im', 'Mir geht es gut', 'I am fine'),
        ]
        for i, (kmr, pron, de, en) in enumerate(words):
            Word.objects.create(lesson=lesson, kmr=kmr, pronunciation=pron, de=de, en=en, order=i)

        self._make_exercises(lesson, [
            {'lang': 'de', 'q': 'Was bedeutet "silav"?',
             'choices': [('Hallo', True), ('Tschüss', False), ('Danke', False), ('Bitte', False)]},
            {'lang': 'en', 'q': 'How do you say "thank you" in Kurmanji?', 'choice_lang': 'kmr',
             'choices': [('spas', True), ('silav', False), ('erê', False), ('na', False)]},
            {'lang': 'de', 'q': 'Was bedeutet "çawa yî?"?',
             'choices': [('Wie geht es dir?', True), ('Wo bist du?', False), ('Wie heißt du?', False), ('Wie alt bist du?', False)], 'stars': 2},
            {'lang': 'en', 'q': 'What does "oxir be" mean?',
             'choices': [('goodbye', True), ('hello', False), ('welcome', False), ('good night', False)]},
            {'lang': 'de', 'q': 'Wie sagt man "Gute Nacht" auf Kurmanci?', 'choice_lang': 'kmr',
             'choices': [('şevbaş', True), ('rojbaş', False), ('oxir be', False), ('silav', False)]},
            {'lang': 'en', 'q': 'How do you say "welcome" in Kurmanji?', 'choice_lang': 'kmr',
             'choices': [('bi xêr hatî', True), ('spas', False), ('baş e', False), ('bibore', False)], 'stars': 2},
        ])
        self.stdout.write('  ✅ Greetings lesson created')

    def _create_body(self):
        cat, _ = Category.objects.get_or_create(
            name_kmr='Beden', defaults={'name_de': 'Körper', 'name_en': 'Body', 'icon': '🧍', 'order': 6}
        )
        lesson, created = Lesson.objects.get_or_create(
            title_kmr='Beşên laş',
            defaults={
                'category': cat,
                'title_de': 'Körperteile', 'title_en': 'Body Parts',
                'description_de': 'Lerne die Körperteile auf Kurmanci.',
                'description_en': 'Learn body part names in Kurmanji.',
                'level': 1, 'order': 1,
            }
        )
        if not created:
            return

        words = [
            ('ser', 'ser', 'Kopf', 'head'),
            ('çav', 'chav', 'Auge', 'eye'),
            ('guh', 'guh', 'Ohr', 'ear'),
            ('dev', 'dev', 'Mund', 'mouth'),
            ('dest', 'dest', 'Hand', 'hand'),
            ('pê', 'pe', 'Fuß', 'foot'),
            ('dil', 'dil', 'Herz', 'heart'),
            ('por', 'por', 'Haar', 'hair'),
            ('poz', 'poz', 'Nase', 'nose'),
            ('tilî', 'ti-lee', 'Finger', 'finger'),
        ]
        for i, (kmr, pron, de, en) in enumerate(words):
            Word.objects.create(lesson=lesson, kmr=kmr, pronunciation=pron, de=de, en=en, order=i)

        self._make_exercises(lesson, [
            {'lang': 'de', 'q': 'Was bedeutet "ser"?',
             'choices': [('Kopf', True), ('Hand', False), ('Fuß', False), ('Ohr', False)]},
            {'lang': 'en', 'q': 'How do you say "eye" in Kurmanji?', 'choice_lang': 'kmr',
             'choices': [('çav', True), ('guh', False), ('dev', False), ('poz', False)]},
            {'lang': 'de', 'q': 'Was bedeutet "dil"?',
             'choices': [('Herz', True), ('Kopf', False), ('Mund', False), ('Nase', False)], 'stars': 2},
            {'lang': 'en', 'q': 'What does "dest" mean?',
             'choices': [('hand', True), ('foot', False), ('finger', False), ('ear', False)]},
            {'lang': 'de', 'q': 'Wie sagt man "Nase" auf Kurmanci?', 'choice_lang': 'kmr',
             'choices': [('poz', True), ('dev', False), ('guh', False), ('çav', False)]},
        ])
        self.stdout.write('  ✅ Body parts lesson created')

    def _create_food(self):
        cat, _ = Category.objects.get_or_create(
            name_kmr='Xwarin', defaults={'name_de': 'Essen & Trinken', 'name_en': 'Food & Drink', 'icon': '🍽️', 'order': 7}
        )
        lesson, created = Lesson.objects.get_or_create(
            title_kmr='Xwarin û vexwarin',
            defaults={
                'category': cat,
                'title_de': 'Essen und Trinken', 'title_en': 'Food and Drink',
                'description_de': 'Lerne Wörter für Essen und Trinken.',
                'description_en': 'Learn words for food and drink.',
                'level': 1, 'order': 1,
            }
        )
        if not created:
            return

        words = [
            ('nan', 'nan', 'Brot', 'bread'),
            ('av', 'av', 'Wasser', 'water'),
            ('şîr', 'sheer', 'Milch', 'milk'),
            ('goşt', 'gosht', 'Fleisch', 'meat'),
            ('sêv', 'sev', 'Apfel', 'apple'),
            ('çay', 'chay', 'Tee', 'tea'),
            ('mast', 'mast', 'Joghurt', 'yogurt'),
            ('birinc', 'bi-rinch', 'Reis', 'rice'),
            ('tirî', 'ti-ree', 'Traube', 'grape'),
            ('hêk', 'hek', 'Ei', 'egg'),
        ]
        for i, (kmr, pron, de, en) in enumerate(words):
            Word.objects.create(lesson=lesson, kmr=kmr, pronunciation=pron, de=de, en=en, order=i)

        self._make_exercises(lesson, [
            {'lang': 'de', 'q': 'Was bedeutet "nan"?',
             'choices': [('Brot', True), ('Wasser', False), ('Milch', False), ('Reis', False)]},
            {'lang': 'en', 'q': 'How do you say "water" in Kurmanji?', 'choice_lang': 'kmr',
             'choices': [('av', True), ('şîr', False), ('çay', False), ('mast', False)]},
            {'lang': 'de', 'q': 'Was bedeutet "goşt"?',
             'choices': [('Fleisch', True), ('Brot', False), ('Joghurt', False), ('Ei', False)], 'stars': 2},
            {'lang': 'en', 'q': 'What does "sêv" mean?',
             'choices': [('apple', True), ('grape', False), ('egg', False), ('rice', False)]},
            {'lang': 'de', 'q': 'Wie sagt man "Tee" auf Kurmanci?', 'choice_lang': 'kmr',
             'choices': [('çay', True), ('av', False), ('şîr', False), ('mast', False)]},
            {'lang': 'en', 'q': 'What does "hêk" mean?',
             'choices': [('egg', True), ('bread', False), ('milk', False), ('tea', False)]},
        ])
        self.stdout.write('  ✅ Food lesson created')

    # ========================= A2 LESSONS ========================= #

    def _create_days_time(self):
        cat, _ = Category.objects.get_or_create(
            name_kmr='Dem û Roj', defaults={'name_de': 'Zeit & Tage', 'name_en': 'Time & Days', 'icon': '📅', 'order': 8}
        )
        lesson, created = Lesson.objects.get_or_create(
            title_kmr='Rojên heftê',
            defaults={
                'category': cat,
                'title_de': 'Wochentage', 'title_en': 'Days of the Week',
                'description_de': 'Lerne die Wochentage auf Kurmanci.',
                'description_en': 'Learn the days of the week in Kurmanji.',
                'level': 2, 'order': 1,
            }
        )
        if not created:
            return

        words = [
            ('duşem', 'du-shem', 'Montag', 'Monday'),
            ('sêşem', 'se-shem', 'Dienstag', 'Tuesday'),
            ('çarşem', 'char-shem', 'Mittwoch', 'Wednesday'),
            ('pêncşem', 'pench-shem', 'Donnerstag', 'Thursday'),
            ('în', 'een', 'Freitag', 'Friday'),
            ('şemî', 'she-mee', 'Samstag', 'Saturday'),
            ('yekşem', 'yek-shem', 'Sonntag', 'Sunday'),
        ]
        for i, (kmr, pron, de, en) in enumerate(words):
            Word.objects.create(lesson=lesson, kmr=kmr, pronunciation=pron, de=de, en=en, order=i)

        self._make_exercises(lesson, [
            {'lang': 'de', 'q': 'Was bedeutet "duşem"?',
             'choices': [('Montag', True), ('Dienstag', False), ('Mittwoch', False), ('Freitag', False)]},
            {'lang': 'en', 'q': 'How do you say "Friday" in Kurmanji?', 'choice_lang': 'kmr',
             'choices': [('în', True), ('şemî', False), ('yekşem', False), ('sêşem', False)]},
            {'lang': 'de', 'q': 'Welcher Tag ist "çarşem"?',
             'choices': [('Mittwoch', True), ('Donnerstag', False), ('Dienstag', False), ('Montag', False)], 'stars': 2},
            {'lang': 'en', 'q': 'What day is "yekşem"?',
             'choices': [('Sunday', True), ('Saturday', False), ('Monday', False), ('Thursday', False)]},
        ])

        # Time lesson
        lesson2, created2 = Lesson.objects.get_or_create(
            title_kmr='Dem û wext',
            defaults={
                'category': cat,
                'title_de': 'Uhrzeit & Tageszeiten', 'title_en': 'Time & Parts of Day',
                'description_de': 'Lerne Tageszeiten und Zeitausdrücke.',
                'description_en': 'Learn parts of the day and time expressions.',
                'level': 2, 'order': 2,
            }
        )
        if created2:
            words2 = [
                ('sibeh', 'si-beh', 'Morgen', 'morning'),
                ('nîvro', 'nee-vro', 'Mittag', 'noon'),

                ('êvar', 'e-var', 'Abend', 'evening'),
                ('şev', 'shev', 'Nacht', 'night'),
                ('îro', 'ee-ro', 'heute', 'today'),
                ('duh', 'duh', 'gestern', 'yesterday'),
                ('sibê', 'si-be', 'morgen', 'tomorrow'),
                ('niha', 'ni-ha', 'jetzt', 'now'),
                ('saet', 'sa-et', 'Uhr / Stunde', 'hour / clock'),
                ('deqîqe', 'de-kee-ke', 'Minute', 'minute'),
            ]
            for i, (kmr, pron, de, en) in enumerate(words2):
                Word.objects.create(lesson=lesson2, kmr=kmr, pronunciation=pron, de=de, en=en, order=i)

            self._make_exercises(lesson2, [
                {'lang': 'de', 'q': 'Was bedeutet "sibeh"?',
                 'choices': [('Morgen', True), ('Abend', False), ('Nacht', False), ('Mittag', False)]},
                {'lang': 'en', 'q': 'How do you say "today" in Kurmanji?', 'choice_lang': 'kmr',
                 'choices': [('îro', True), ('duh', False), ('sibê', False), ('niha', False)]},
                {'lang': 'de', 'q': 'Was bedeutet "şev"?',
                 'choices': [('Nacht', True), ('Morgen', False), ('Abend', False), ('Mittag', False)], 'stars': 2},
                {'lang': 'en', 'q': 'What does "duh" mean?',
                 'choices': [('yesterday', True), ('today', False), ('tomorrow', False), ('now', False)]},
            ])

        self.stdout.write('  ✅ Days & time lessons created')

    def _create_house(self):
        cat, _ = Category.objects.get_or_create(
            name_kmr='Mal', defaults={'name_de': 'Haus & Wohnung', 'name_en': 'House & Home', 'icon': '🏠', 'order': 9}
        )
        lesson, created = Lesson.objects.get_or_create(
            title_kmr='Tiştên malê',
            defaults={
                'category': cat,
                'title_de': 'Gegenstände im Haus', 'title_en': 'Things in the House',
                'description_de': 'Lerne Wörter rund ums Haus.',
                'description_en': 'Learn household vocabulary.',
                'level': 2, 'order': 1,
            }
        )
        if not created:
            return

        words = [
            ('mal', 'mal', 'Haus', 'house'),
            ('ode', 'o-de', 'Zimmer', 'room'),
            ('derî', 'de-ree', 'Tür', 'door'),
            ('pencere', 'pen-je-re', 'Fenster', 'window'),
            ('mase', 'ma-se', 'Tisch', 'table'),
            ('kursî', 'kur-see', 'Stuhl', 'chair'),
            ('nivîn', 'ni-veen', 'Bett', 'bed'),
            ('metbex', 'met-bekh', 'Küche', 'kitchen'),
            ('serşok', 'ser-shok', 'Badezimmer', 'bathroom'),
            ('bexçe', 'bekh-che', 'Garten', 'garden'),
        ]
        for i, (kmr, pron, de, en) in enumerate(words):
            Word.objects.create(lesson=lesson, kmr=kmr, pronunciation=pron, de=de, en=en, order=i)

        self._make_exercises(lesson, [
            {'lang': 'de', 'q': 'Was bedeutet "mal"?',
             'choices': [('Haus', True), ('Zimmer', False), ('Tür', False), ('Garten', False)]},
            {'lang': 'en', 'q': 'How do you say "door" in Kurmanji?', 'choice_lang': 'kmr',
             'choices': [('derî', True), ('pencere', False), ('mase', False), ('kursî', False)]},
            {'lang': 'de', 'q': 'Was bedeutet "metbex"?',
             'choices': [('Küche', True), ('Badezimmer', False), ('Zimmer', False), ('Garten', False)], 'stars': 2},
            {'lang': 'en', 'q': 'What does "nivîn" mean?',
             'choices': [('bed', True), ('chair', False), ('table', False), ('room', False)]},
            {'lang': 'en', 'q': 'How do you say "garden" in Kurmanji?', 'choice_lang': 'kmr',
             'choices': [('bexçe', True), ('mal', False), ('ode', False), ('metbex', False)]},
        ])
        self.stdout.write('  ✅ House lesson created')

    def _create_clothing(self):
        cat, _ = Category.objects.get_or_create(
            name_kmr='Cil û berg', defaults={'name_de': 'Kleidung', 'name_en': 'Clothing', 'icon': '👕', 'order': 10}
        )
        lesson, created = Lesson.objects.get_or_create(
            title_kmr='Cil û bergên rojane',
            defaults={
                'category': cat,
                'title_de': 'Alltagskleidung', 'title_en': 'Everyday Clothing',
                'description_de': 'Lerne Kleidungsstücke auf Kurmanci.',
                'description_en': 'Learn clothing vocabulary in Kurmanji.',
                'level': 2, 'order': 1,
            }
        )
        if not created:
            return

        words = [
            ('kirasê', 'ki-ra-se', 'Hemd', 'shirt'),
            ('pantol', 'pan-tol', 'Hose', 'pants'),
            ('pêlav', 'pe-lav', 'Schuhe', 'shoes'),
            ('kumik', 'ku-mik', 'Mütze', 'hat'),
            ('çakêt', 'cha-ket', 'Jacke', 'jacket'),
            ('gore', 'go-re', 'Socken', 'socks'),
            ('fîstan', 'fees-tan', 'Kleid', 'dress'),
            ('kember', 'kem-ber', 'Gürtel', 'belt'),
        ]
        for i, (kmr, pron, de, en) in enumerate(words):
            Word.objects.create(lesson=lesson, kmr=kmr, pronunciation=pron, de=de, en=en, order=i)

        self._make_exercises(lesson, [
            {'lang': 'de', 'q': 'Was bedeutet "pêlav"?',
             'choices': [('Schuhe', True), ('Hose', False), ('Hemd', False), ('Mütze', False)]},
            {'lang': 'en', 'q': 'How do you say "jacket" in Kurmanji?', 'choice_lang': 'kmr',
             'choices': [('çakêt', True), ('kirasê', False), ('pantol', False), ('kumik', False)]},
            {'lang': 'de', 'q': 'Was bedeutet "fîstan"?',
             'choices': [('Kleid', True), ('Gürtel', False), ('Socken', False), ('Jacke', False)], 'stars': 2},
            {'lang': 'en', 'q': 'What does "gore" mean?',
             'choices': [('socks', True), ('shoes', False), ('belt', False), ('hat', False)]},
        ])
        self.stdout.write('  ✅ Clothing lesson created')

    def _create_nature(self):
        cat, _ = Category.objects.get_or_create(
            name_kmr='Xweza', defaults={'name_de': 'Natur', 'name_en': 'Nature', 'icon': '🌿', 'order': 11}
        )
        lesson, created = Lesson.objects.get_or_create(
            title_kmr='Xweza û hewa',
            defaults={
                'category': cat,
                'title_de': 'Natur und Wetter', 'title_en': 'Nature and Weather',
                'description_de': 'Lerne Natur- und Wetterbegriffe.',
                'description_en': 'Learn nature and weather vocabulary.',
                'level': 2, 'order': 1,
            }
        )
        if not created:
            return

        words = [
            ('roj', 'roj', 'Sonne', 'sun'),
            ('heyv', 'heyv', 'Mond', 'moon'),
            ('stêr', 'ster', 'Stern', 'star'),
            ('baran', 'ba-ran', 'Regen', 'rain'),
            ('berf', 'berf', 'Schnee', 'snow'),
            ('ba', 'ba', 'Wind', 'wind'),
            ('dar', 'dar', 'Baum', 'tree'),
            ('gul', 'gul', 'Blume', 'flower'),
            ('çiya', 'chi-ya', 'Berg', 'mountain'),
            ('çem', 'chem', 'Fluss', 'river'),
            ('deryayî', 'der-ya-yee', 'Meer', 'sea'),
            ('ewr', 'ewr', 'Wolke', 'cloud'),
        ]
        for i, (kmr, pron, de, en) in enumerate(words):
            Word.objects.create(lesson=lesson, kmr=kmr, pronunciation=pron, de=de, en=en, order=i)

        self._make_exercises(lesson, [
            {'lang': 'de', 'q': 'Was bedeutet "roj"?',
             'choices': [('Sonne', True), ('Mond', False), ('Stern', False), ('Wolke', False)]},
            {'lang': 'en', 'q': 'How do you say "rain" in Kurmanji?', 'choice_lang': 'kmr',
             'choices': [('baran', True), ('berf', False), ('ba', False), ('ewr', False)]},
            {'lang': 'de', 'q': 'Was bedeutet "çiya"?',
             'choices': [('Berg', True), ('Fluss', False), ('Meer', False), ('Baum', False)], 'stars': 2},
            {'lang': 'en', 'q': 'What does "gul" mean?',
             'choices': [('flower', True), ('tree', False), ('mountain', False), ('star', False)]},
            {'lang': 'de', 'q': 'Wie sagt man "Schnee" auf Kurmanci?', 'choice_lang': 'kmr',
             'choices': [('berf', True), ('baran', False), ('ba', False), ('ewr', False)]},
            {'lang': 'en', 'q': 'What does "deryayî" mean?',
             'choices': [('sea', True), ('river', False), ('cloud', False), ('rain', False)], 'stars': 2},
        ])
        self.stdout.write('  ✅ Nature lesson created')

    # ========================= B1 LESSONS ========================= #

    def _create_emotions(self):
        cat, _ = Category.objects.get_or_create(
            name_kmr='Hest', defaults={'name_de': 'Gefühle', 'name_en': 'Emotions', 'icon': '😊', 'order': 12}
        )
        lesson, created = Lesson.objects.get_or_create(
            title_kmr='Hest û rewş',
            defaults={
                'category': cat,
                'title_de': 'Gefühle und Stimmungen', 'title_en': 'Feelings and Moods',
                'description_de': 'Drücke deine Gefühle auf Kurmanci aus.',
                'description_en': 'Express your feelings in Kurmanji.',
                'level': 3, 'order': 1,
            }
        )
        if not created:
            return

        words = [
            ('kêfxweş', 'kef-khwesh', 'glücklich', 'happy'),
            ('xemgîn', 'khem-geen', 'traurig', 'sad'),
            ('hêrs', 'hers', 'wütend', 'angry'),
            ('tirsiyayî', 'tir-si-ya-yee', 'ängstlich', 'scared'),
            ('bêzar', 'be-zar', 'gelangweilt', 'bored'),
            ('westiyayî', 'wes-ti-ya-yee', 'müde', 'tired'),
            ('dilşad', 'dil-shad', 'fröhlich', 'joyful'),
            ('şerm', 'sherm', 'schüchtern', 'shy'),
            ('sersam', 'ser-sam', 'überrascht', 'surprised'),
            ('hêvîdar', 'he-vee-dar', 'hoffnungsvoll', 'hopeful'),

        ]
        for i, (kmr, pron, de, en) in enumerate(words):
            Word.objects.create(lesson=lesson, kmr=kmr, pronunciation=pron, de=de, en=en, order=i)

        self._make_exercises(lesson, [
            {'lang': 'de', 'q': 'Was bedeutet "kêfxweş"?',
             'choices': [('glücklich', True), ('traurig', False), ('wütend', False), ('müde', False)]},
            {'lang': 'en', 'q': 'How do you say "sad" in Kurmanji?', 'choice_lang': 'kmr',
             'choices': [('xemgîn', True), ('hêrs', False), ('bêzar', False), ('şerm', False)]},
            {'lang': 'de', 'q': 'Was bedeutet "westiyayî"?',
             'choices': [('müde', True), ('ängstlich', False), ('gelangweilt', False), ('überrascht', False)], 'stars': 2},
            {'lang': 'en', 'q': 'What does "hêvîdar" mean?',
             'choices': [('hopeful', True), ('joyful', False), ('shy', False), ('angry', False)]},
            {'lang': 'de', 'q': 'Wie sagt man "überrascht" auf Kurmanci?', 'choice_lang': 'kmr',
             'choices': [('sersam', True), ('tirsiyayî', False), ('dilşad', False), ('kêfxweş', False)], 'stars': 2},
        ])
        self.stdout.write('  ✅ Emotions lesson created')

    def _create_professions(self):
        cat, _ = Category.objects.get_or_create(
            name_kmr='Pîşe', defaults={'name_de': 'Berufe', 'name_en': 'Professions', 'icon': '👩‍⚕️', 'order': 13}
        )
        lesson, created = Lesson.objects.get_or_create(
            title_kmr='Pîşe û kar',
            defaults={
                'category': cat,
                'title_de': 'Berufe und Arbeit', 'title_en': 'Professions and Work',
                'description_de': 'Lerne Berufsbezeichnungen auf Kurmanci.',
                'description_en': 'Learn profession names in Kurmanji.',
                'level': 3, 'order': 1,
            }
        )
        if not created:
            return

        words = [
            ('mamosta', 'ma-mos-ta', 'Lehrer/in', 'teacher'),
            ('bijîşk', 'bi-jishk', 'Arzt/Ärztin', 'doctor'),
            ('cotkar', 'jot-kar', 'Bauer/Bäuerin', 'farmer'),
            ('şofêr', 'sho-fer', 'Fahrer/in', 'driver'),
            ('firoşkar', 'fi-rosh-kar', 'Verkäufer/in', 'seller'),
            ('polîs', 'po-lees', 'Polizist/in', 'police'),
            ('aşpêj', 'ash-pej', 'Koch/Köchin', 'cook'),
            ('mühendis', 'mu-hen-dis', 'Ingenieur/in', 'engineer'),
            ('parêzer', 'pa-re-zer', 'Anwalt/Anwältin', 'lawyer'),
            ('hunermend', 'hu-ner-mend', 'Künstler/in', 'artist'),
        ]
        for i, (kmr, pron, de, en) in enumerate(words):
            Word.objects.create(lesson=lesson, kmr=kmr, pronunciation=pron, de=de, en=en, order=i)

        self._make_exercises(lesson, [
            {'lang': 'de', 'q': 'Was bedeutet "mamosta"?',
             'choices': [('Lehrer/in', True), ('Arzt/Ärztin', False), ('Koch/Köchin', False), ('Bauer/Bäuerin', False)]},
            {'lang': 'en', 'q': 'How do you say "doctor" in Kurmanji?', 'choice_lang': 'kmr',
             'choices': [('bijîşk', True), ('polîs', False), ('mamosta', False), ('parêzer', False)]},
            {'lang': 'de', 'q': 'Was bedeutet "cotkar"?',
             'choices': [('Bauer/Bäuerin', True), ('Fahrer/in', False), ('Verkäufer/in', False), ('Ingenieur/in', False)], 'stars': 2},
            {'lang': 'en', 'q': 'What does "hunermend" mean?',
             'choices': [('artist', True), ('engineer', False), ('lawyer', False), ('cook', False)]},
            {'lang': 'de', 'q': 'Wie sagt man "Koch" auf Kurmanci?', 'choice_lang': 'kmr',
             'choices': [('aşpêj', True), ('firoşkar', False), ('şofêr', False), ('bijîşk', False)]},
        ])
        self.stdout.write('  ✅ Professions lesson created')

    def _create_travel(self):
        cat, _ = Category.objects.get_or_create(
            name_kmr='Rêwîtî', defaults={'name_de': 'Reisen', 'name_en': 'Travel', 'icon': '✈️', 'order': 14}
        )
        lesson, created = Lesson.objects.get_or_create(
            title_kmr='Rêwîtî û veguhestin',
            defaults={
                'category': cat,
                'title_de': 'Reisen und Verkehr', 'title_en': 'Travel and Transport',
                'description_de': 'Nützliche Wörter für Reisen und Transport.',
                'description_en': 'Useful words for travel and transport.',
                'level': 3, 'order': 1,
            }
        )
        if not created:
            return

        words = [
            ('balafir', 'ba-la-fir', 'Flugzeug', 'airplane'),
            ('trên', 'tren', 'Zug', 'train'),
            ('otobûs', 'o-to-boos', 'Bus', 'bus'),
            ('erebe', 'e-re-be', 'Auto', 'car'),
            ('pasaport', 'pa-sa-port', 'Reisepass', 'passport'),
            ('otêl', 'o-tel', 'Hotel', 'hotel'),
            ('nexşe', 'nekh-she', 'Karte', 'map'),
            ('bilêt', 'bi-let', 'Ticket', 'ticket'),
            ('wêstgeh', 'west-geh', 'Bahnhof', 'station'),
            ('firokexane', 'fi-ro-ke-kha-ne', 'Flughafen', 'airport'),
        ]
        for i, (kmr, pron, de, en) in enumerate(words):
            Word.objects.create(lesson=lesson, kmr=kmr, pronunciation=pron, de=de, en=en, order=i)

        self._make_exercises(lesson, [
            {'lang': 'de', 'q': 'Was bedeutet "balafir"?',
             'choices': [('Flugzeug', True), ('Zug', False), ('Bus', False), ('Auto', False)]},
            {'lang': 'en', 'q': 'How do you say "train" in Kurmanji?', 'choice_lang': 'kmr',
             'choices': [('trên', True), ('otobûs', False), ('erebe', False), ('balafir', False)]},
            {'lang': 'de', 'q': 'Was bedeutet "nexşe"?',
             'choices': [('Karte', True), ('Ticket', False), ('Reisepass', False), ('Hotel', False)], 'stars': 2},
            {'lang': 'en', 'q': 'What does "firokexane" mean?',
             'choices': [('airport', True), ('station', False), ('hotel', False), ('bus', False)]},
            {'lang': 'de', 'q': 'Wie sagt man "Ticket" auf Kurmanci?', 'choice_lang': 'kmr',
             'choices': [('bilêt', True), ('nexşe', False), ('pasaport', False), ('wêstgeh', False)], 'stars': 2},
        ])
        self.stdout.write('  ✅ Travel lesson created')

    # ========================= B2 LESSONS ========================= #

    def _create_advanced_verbs(self):
        cat, _ = Category.objects.get_or_create(
            name_kmr='Lêker', defaults={'name_de': 'Verben', 'name_en': 'Verbs', 'icon': '🏃', 'order': 15}
        )
        lesson, created = Lesson.objects.get_or_create(
            title_kmr='Lêkerên girîng',
            defaults={
                'category': cat,
                'title_de': 'Wichtige Verben', 'title_en': 'Important Verbs',
                'description_de': 'Lerne wichtige Verben für den Alltag.',
                'description_en': 'Learn essential everyday verbs.',
                'level': 4, 'order': 1,
            }
        )
        if not created:
            return

        words = [
            ('xwendin', 'khwen-din', 'lesen / lernen', 'to read / to study'),
            ('nivîsandin', 'ni-vee-san-din', 'schreiben', 'to write'),
            ('axaftin', 'a-khaf-tin', 'sprechen', 'to speak'),
            ('guhdarî kirin', 'guh-da-ree ki-rin', 'zuhören', 'to listen'),
            ('çûn', 'choon', 'gehen', 'to go'),
            ('hatin', 'ha-tin', 'kommen', 'to come'),
            ('xwarin', 'khwa-rin', 'essen', 'to eat'),
            ('vexwarin', 've-khwa-rin', 'trinken', 'to drink'),
            ('razandin', 'ra-zan-din', 'schlafen', 'to sleep'),
            ('kirin', 'ki-rin', 'machen / tun', 'to do / to make'),
            ('zanîn', 'za-neen', 'wissen', 'to know'),
            ('dîtin', 'dee-tin', 'sehen', 'to see'),
        ]
        for i, (kmr, pron, de, en) in enumerate(words):
            Word.objects.create(lesson=lesson, kmr=kmr, pronunciation=pron, de=de, en=en, order=i)

        self._make_exercises(lesson, [
            {'lang': 'de', 'q': 'Was bedeutet "xwendin"?',
             'choices': [('lesen / lernen', True), ('schreiben', False), ('sprechen', False), ('zuhören', False)]},
            {'lang': 'en', 'q': 'How do you say "to speak" in Kurmanji?', 'choice_lang': 'kmr',
             'choices': [('axaftin', True), ('guhdarî kirin', False), ('xwendin', False), ('nivîsandin', False)]},
            {'lang': 'de', 'q': 'Was bedeutet "çûn"?',
             'choices': [('gehen', True), ('kommen', False), ('essen', False), ('schlafen', False)], 'stars': 2},
            {'lang': 'en', 'q': 'What does "zanîn" mean?',
             'choices': [('to know', True), ('to see', False), ('to do', False), ('to come', False)]},
            {'lang': 'de', 'q': 'Wie sagt man "trinken" auf Kurmanci?', 'choice_lang': 'kmr',
             'choices': [('vexwarin', True), ('xwarin', False), ('razandin', False), ('hatin', False)]},
            {'lang': 'en', 'q': 'What does "dîtin" mean?',
             'choices': [('to see', True), ('to know', False), ('to do', False), ('to go', False)], 'stars': 2},
        ])
        self.stdout.write('  ✅ Verbs lesson created')

    def _create_society(self):
        cat, _ = Category.objects.get_or_create(
            name_kmr='Civak', defaults={'name_de': 'Gesellschaft', 'name_en': 'Society', 'icon': '🏛️', 'order': 16}
        )
        lesson, created = Lesson.objects.get_or_create(
            title_kmr='Civak û jiyan',
            defaults={
                'category': cat,
                'title_de': 'Gesellschaft und Leben', 'title_en': 'Society and Life',
                'description_de': 'Fortgeschrittene Begriffe zu Gesellschaft und Kultur.',
                'description_en': 'Advanced terms about society and culture.',
                'level': 4, 'order': 1,
            }
        )
        if not created:
            return

        words = [
            ('welat', 'we-lat', 'Heimat / Land', 'homeland / country'),
            ('ziman', 'zi-man', 'Sprache', 'language'),
            ('çand', 'chand', 'Kultur', 'culture'),
            ('dîrok', 'dee-rok', 'Geschichte', 'history'),
            ('azadî', 'a-za-dee', 'Freiheit', 'freedom'),
            ('aştî', 'ash-tee', 'Frieden', 'peace'),
            ('perwerde', 'per-wer-de', 'Bildung', 'education'),
            ('maf', 'maf', 'Recht', 'right'),
            ('gel', 'gel', 'Volk', 'people / nation'),
            ('hevkarî', 'hev-ka-ree', 'Zusammenarbeit', 'cooperation'),
        ]
        for i, (kmr, pron, de, en) in enumerate(words):
            Word.objects.create(lesson=lesson, kmr=kmr, pronunciation=pron, de=de, en=en, order=i)

        self._make_exercises(lesson, [
            {'lang': 'de', 'q': 'Was bedeutet "welat"?',
             'choices': [('Heimat / Land', True), ('Sprache', False), ('Kultur', False), ('Geschichte', False)]},
            {'lang': 'en', 'q': 'How do you say "language" in Kurmanji?', 'choice_lang': 'kmr',
             'choices': [('ziman', True), ('çand', False), ('welat', False), ('dîrok', False)]},
            {'lang': 'de', 'q': 'Was bedeutet "azadî"?',
             'choices': [('Freiheit', True), ('Frieden', False), ('Bildung', False), ('Recht', False)], 'stars': 2},
            {'lang': 'en', 'q': 'What does "aştî" mean?',
             'choices': [('peace', True), ('freedom', False), ('education', False), ('cooperation', False)]},
            {'lang': 'de', 'q': 'Wie sagt man "Bildung" auf Kurmanci?', 'choice_lang': 'kmr',
             'choices': [('perwerde', True), ('maf', False), ('gel', False), ('hevkarî', False)], 'stars': 2},
            {'lang': 'en', 'q': 'What does "gel" mean?',
             'choices': [('people / nation', True), ('culture', False), ('history', False), ('right', False)]},
        ])
        self.stdout.write('  ✅ Society lesson created')
