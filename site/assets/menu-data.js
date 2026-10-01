/* Hunan West menu. EDIT HERE to change dishes or prices; the menu section builds itself from this list.
   Source: the restaurant's Yelp menu as supplied by the client (October 2026). Names and descriptions are lightly
   cleaned up (see CLAUDE.md). The raw-food caution that Yelp repeats on every item is shown once, under the menu.

   Each dish: [English name, Chinese name, description, price, tags]
   tags (optional): "popular" = among the dishes guests mention most on Yelp.
                    "spicy" / "mild" force the chili mark on or off. Without either, menu.js marks a dish spicy
                    when its name or description says hot or spicy (and not "not hot" or "non-spicy"). */
const MENU = [
  {
    id: "chefs-specials", name: "Chef's Specials", zh: "招牌菜",
    items: [
      ["Beef & Scallop with Vegetable", "干貝牛", "Sliced beef and sea scallops sautéed with vegetables in a brown sauce. Served on a sizzling hot plate when you dine in.", 22.95],
      ["Cleopatra Chicken", "貴妃雞", "Chunks of white meat chicken sautéed in a spicy brown sauce, surrounded by steamed broccoli.", 20.45],
      ["Crispy Beef Proper", "干扁牛絲", "Shredded beef fried crispy and sautéed with carrot and celery in a caramelized hot and spicy sauce with sesame seeds.", 22.95, "popular"],
      ["Crispy Calamari, Salt & Pepper", "椒鹽魷魚", "Thick calamari, lightly coated and fried crispy, tossed with fresh hot pepper, scallion and basil in salt and pepper seasoning.", 20.45],
      ["Crispy Chicken Proper", "干扁雞絲", "Shredded chicken fried crispy and sautéed with carrot and celery in a caramelized hot and spicy sauce with sesame seeds.", 22.95],
      ["Crispy Eggplant", "脆皮茄子", "Lightly coated Chinese eggplant fried crispy and sautéed with basil seasoning.", 16.95],
      ["Crispy Green Beans", "金沙四季豆", "Green beans in a light coating, fried crispy and sautéed with a special seasoning.", 16.95],
      ["Crispy Orange Beef", "陳皮牛", "Large slices of tender beef fried crispy and sautéed in a rich, hot and spicy, sweet orange-flavored brown sauce.", 21.95],
      ["Crispy Sesame Beef", "芝麻牛", "Large slices of tender beef fried crispy and sautéed in a rich, sweet brown sauce with sesame seeds.", 21.95],
      ["Crispy Shrimp with Salad Sauce", "奶油大蝦", "Jumbo shrimp fried crispy and sautéed in a light mayonnaise sauce with green pepper and pineapple.", 21.75],
      ["Crispy Shrimp, Salt & Pepper", "椒鹽大蝦", "Jumbo shrimp in a light batter, fried crispy and tossed with Thai basil leaves, garlic, fresh chili pepper and seasoned salt.", 21.75],
      ["Crispy Shrimp with Vegetable", "本樓大蝦", "Jumbo shrimp in a light batter, fried crispy and sautéed with vegetables in a light sauce.", 21.75],
      ["Crispy Walnut Shrimp", "核桃蝦", "Jumbo shrimp in a light batter, fried crispy and sautéed in a spicy, tangy tomato-flavored sauce, topped with walnuts. Can't be made without spice.", 21.75],
      ["Firecracker Shrimp", "干烹大蝦", "Jumbo shrimp in a light batter, fried crispy and sautéed in a light sweet and sour sauce with scallion, ginger and bell pepper.", 21.75],
      ["General Tso Shrimp", "左宗棠蝦", "Jumbo shrimp in a light batter, fried crispy and sautéed in a sweet, spicy brown sauce.", 21.75],
      ["Gunpowder Shrimp", "干燒大蝦", "Jumbo shrimp sautéed with chopped onion in a spicy tomato-flavored sauce. Can't be made without spice.", 21.75],
      ["Happy Family", "全家福", "Shrimp, scallops, beef, chicken and roast pork sautéed with vegetables in a brown sauce.", 22.25],
      ["Lamb of Two Flavors", "雙味羊", "Sliced lamb cooked two ways on one plate. One side is sautéed with broccoli, baby corn, bamboo shoots and straw mushrooms in a spicy brown sauce; the other with onion and spring onion in a brown sauce.", 22.95],
      ["Macadamia Chicken", "脆果雞", "Chunks of white meat chicken sautéed in a sweet brown sauce with water chestnuts and macadamia nuts.", 20.75],
      ["Macadamia Shrimp", "脆果蝦", "Jumbo shrimp sautéed with snow peas, carrot, water chestnuts and macadamia nuts in a white sauce.", 22.45],
      ["Neptune Supreme", "海龍王", "Shrimp, scallops, calamari and crab meat sautéed with snow peas, carrot and mushrooms in a light clear sauce.", 21.75],
      ["Peking Duck", "北京鴨", "Served with scallions and plum sauce. 12 pancakes with a whole duck, 6 with a half duck.", 28.95, "popular"]
    ]
  },
  {
    id: "appetizers", name: "Appetizers", zh: "開胃菜",
    items: [
      ["Appetizer Platter for 2", "2人頭盤", "Two each of spare ribs, vegetable spring rolls, shrimp tempura and beef satay.", 20.50],
      ["Barbecued Spare Ribs", "燒排骨", "", 11.25],
      ["Beef on the Stick", "牛串", "", 11.95],
      ["Chicken Lettuce Wrap", "雞鬆", "", 10.75],
      ["Chicken on the Stick", "雞串", "", 9.95],
      ["Chicken Wings", "雞翅", "Eight wing pieces.", 11.25],
      ["Cold Sesame Noodles", "芝麻涼麵", "Cold egg noodles tossed in peanut butter and sesame sauce, topped with sesame seeds and shredded cucumber.", 7.25],
      ["Crab Rangoon", "蟹角", "", 7.25, "popular"],
      ["Edamame with Sea Salt", "鹽水毛豆", "", 7.25],
      ["Egg Rolls (2)", "春卷", "", 5.75],
      ["Fried Calamari", "炸魷魚", "", 11.95],
      ["Fried Wonton", "炸雲吞", "Crispy fried wonton skins with a small pork filling.", 6.00],
      ["Meat Dumplings", "餃", "", 8.00],
      ["Scallion Pancake", "蔥油餅", "Homemade thin pancake seasoned with salt and scallion, pan-fried until crispy.", 7.45],
      ["Shrimp Tempura", "炸大蝦", "", 10.95],
      ["Shrimp Toast", "蝦多士", "Shrimp mousse spread on bread, fried crispy and cut in half.", 9.15],
      ["Spicy Tangy Wonton", "紅油抄手", "Steamed thin-skin wontons with a shrimp and pork filling, topped with a spicy, tangy sauce.", 10.45],
      ["String Beans with Ginger Sauce", "薑汁四季豆", "", 7.95],
      ["Vegetable Dumplings", "素餃", "", 7.25],
      ["Vegetable Lettuce Wrap", "素菜鬆", "", 10.75],
      ["Vegetable Spring Rolls (2)", "素春卷", "", 5.25],
      ["Vietnamese Summer Rolls", "越式蝦卷", "", 6.50]
    ]
  },
  {
    id: "soup", name: "Soup", zh: "湯",
    items: [
      ["Egg Drop Soup", "蛋花湯", "", 4.50, "popular"],
      ["Hot & Sour Soup", "酸辣湯", "With egg and a spicy sauce.", 4.75],
      ["Minced Chicken, Corn & Egg White Soup", "雞蓉玉米湯", "", 6.25],
      ["Tom Kha Gai", "泰式椰雞湯", "Thai chicken soup in coconut broth.", 6.25],
      ["Tom Yam Gai", "泰式雞酸湯", "Thai hot and sour chicken soup.", 6.25],
      ["Tom Yam Goong", "泰式蝦酸湯", "Thai hot and sour shrimp soup.", 6.95],
      ["Triple Delight Vegetable Soup", "三鮮湯", "Chicken, beef, shrimp and vegetables in a clear broth.", 7.55],
      ["Vegetable Tofu Soup", "素菜豆腐湯", "Mixed vegetables in a clear broth.", 4.95],
      ["Wonton Soup", "雲吞湯", "", 4.50, "popular"],
      ["Wonton Soup, Hong Kong Style", "香港雲吞湯", "Thin-skin wontons with a shrimp and pork filling.", 5.95]
    ]
  },
  {
    id: "chicken", name: "Chicken", zh: "雞",
    items: [
      ["Chicken Almond", "杏仁雞", "Sliced white meat chicken sautéed with mushrooms, water chestnuts, green peas and carrot in a light clear sauce, topped with almonds.", 15.50],
      ["Chicken Asparagus", "蘆筍雞", "Sliced white meat chicken sautéed with asparagus and carrot in a light clear sauce.", 16.95],
      ["Chicken with Black Bean Sauce", "豉椒雞", "Sliced white meat chicken sautéed with green pepper and onion in a hot and spicy black bean brown sauce.", 15.50],
      ["Chicken Broccoli", "芥蘭雞", "Sliced white meat chicken sautéed with broccoli in a brown sauce.", 15.50],
      ["Chicken with Green Pepper & Onion", "青椒雞", "Sliced white meat chicken sautéed with green pepper and onion in a brown sauce.", 15.50],
      ["Chicken with Hot Garlic Sauce", "魚香雞", "Shredded white meat chicken with shredded carrot and celery, water chestnuts, wood ear mushroom and a little broccoli in a hot and spicy garlic sauce.", 15.50],
      ["Chicken with Mixed Vegetables", "素菜雞", "Sliced white meat chicken sautéed with mixed vegetables in a brown sauce.", 15.50],
      ["Chicken with Snow Peas", "雪豆雞", "Sliced white meat chicken sautéed with snow peas and water chestnuts in a brown sauce.", 15.50],
      ["Chicken, Szechuan Style", "干燒雞", "Shredded white meat chicken sautéed with shredded carrot and celery in a hot and spicy brown bean sauce.", 15.50],
      ["Chicken with Eggplant", "茄子雞", "Sliced chicken breast sautéed with Chinese eggplant in a brown sauce.", 16.50],
      ["Chicken with String Beans", "四季豆雞絲", "Shredded white meat chicken sautéed with string beans in a brown sauce.", 15.95],
      ["Curry Chicken", "加厘雞", "Sliced white meat chicken sautéed with green pepper, carrot and onion in a yellow curry sauce, not hot.", 15.50],
      ["Diced Chicken with Cashew Nuts", "腰果雞", "Diced dark meat chicken sautéed with water chestnuts and cashew nuts in a brown bean sauce.", 15.50],
      ["Diced Chicken with Hot Pepper", "麻辣雞丁", "Diced dark meat chicken sautéed with green pepper and carrot in a hot and spicy peppercorn brown sauce.", 15.50],
      ["General Tso Chicken", "左公雞", "Chunks of dark meat chicken fried crispy and sautéed in a hot and sweet brown sauce.", 18.75, "popular"],
      ["House Crispy Chicken with Vegetables", "本樓雞", "Chunks of dark meat chicken fried crispy and sautéed with vegetables in a hot, light brown sauce.", 18.25],
      ["Hunan Chicken", "湖南雞", "Sliced white meat chicken sautéed with broccoli and straw mushrooms in a hot and spicy brown sauce.", 15.50],
      ["Kung Pao Diced Chicken", "宮保雞", "Diced dark meat chicken sautéed with water chestnuts, peanuts and dried hot peppers in a hot and spicy brown sauce.", 15.50],
      ["Lemon Chicken", "檸檬雞", "Breaded white meat chicken fillet topped with a sweet and sour lemon sauce. Sauce comes on the side for carryout.", 16.95],
      ["Mongolian Chicken", "蔥爆雞", "Sliced white meat chicken sautéed with green onion and white onion in a brown sauce.", 15.50],
      ["Moo Goo Gai Pan", "蘑菇雞", "Sliced white meat chicken sautéed with broccoli, mushrooms, carrot, snow peas, water chestnuts and bamboo shoots in a light clear sauce.", 15.50, "popular"],
      ["Moo Shu Chicken", "木須雞", "Shredded white meat chicken sautéed with shredded cabbage, mushrooms, bamboo shoots and wood ear mushroom in soy sauce.", 15.75],
      ["Orange Chicken", "陳皮雞", "Chunks of dark meat chicken fried crispy and sautéed in an orange-flavored hot and sweet brown sauce.", 18.75, "popular"],
      ["Salt & Pepper Chicken", "椒鹽雞", "", 18.75],
      ["Sesame Chicken", "芝麻雞", "Chunks of dark meat chicken fried crispy and sautéed in a sweet brown sauce with sesame seeds.", 18.75, "popular"],
      ["Sha Cha Chicken", "沙茶雞", "Shredded white meat chicken sautéed with shredded carrot, celery, onion and green pepper in a hot and spicy Chinese barbecue sauce.", 15.95],
      ["Sweet & Sour Chicken", "甜酸雞", "Breaded white meat chicken with green pepper, onion, carrot and pineapple, topped with sweet and sour sauce. Sauce comes on the side for carryout.", 15.50, "popular"]
    ]
  },
  {
    id: "beef-lamb", name: "Beef & Lamb", zh: "牛・羊",
    items: [
      ["Beef Asparagus", "蘆筍牛", "Sliced beef sautéed with asparagus and carrot in a brown sauce.", 18.75],
      ["Beef with Black Bean Sauce", "豉椒牛", "Sliced beef sautéed with green pepper, onion and bamboo shoots in a spicy black bean brown sauce.", 17.75],
      ["Beef Broccoli", "芥蘭牛", "Sliced beef sautéed with broccoli in a brown sauce.", 17.75],
      ["Beef with Green Beans", "牛肉四季豆", "Shredded beef sautéed with green beans in a brown sauce.", 17.95],
      ["Beef with Green Pepper & Onion", "青椒牛", "Sliced beef sautéed with green pepper and onion in a brown sauce.", 17.75],
      ["Beef with Hot Garlic Sauce", "魚香牛", "Shredded beef with shredded carrot and celery, water chestnuts, broccoli and wood ear mushroom in a garlicky hot and spicy brown sauce.", 17.75],
      ["Beef with Mixed Vegetables", "素菜牛", "Sliced beef sautéed with mixed vegetables in a brown sauce.", 17.75],
      ["Beef with Snow Peas", "雪豆牛", "Sliced beef sautéed with snow peas and water chestnuts in a brown sauce.", 17.75],
      ["Beef, Szechuan Style", "干燒牛", "Shredded beef sautéed with shredded carrot and celery in a hot and sweet brown bean sauce.", 17.75],
      ["Curry Beef", "加厘牛", "Sliced beef sautéed with green pepper, onion and carrot in a mildly spicy yellow curry sauce.", 17.75],
      ["Curry Lamb", "加厘羊", "Sliced lamb sautéed with green pepper, onion and carrot in a mildly spicy yellow curry sauce.", 18.50],
      ["Hunan Beef", "湖南牛", "Sliced beef sautéed with broccoli, straw mushrooms and baby corn in a hot and spicy brown sauce.", 17.75],
      ["Hunan Lamb", "湖南羊肉", "Sliced lamb sautéed with broccoli, straw mushrooms, baby corn and bamboo shoots in a hot and spicy brown sauce.", 18.50],
      ["Kung Pao Beef", "宮保牛", "Sliced beef sautéed with water chestnuts, peanuts, dried hot peppers and scallions in a hot and spicy brown sauce.", 18.50],
      ["Kung Pao Lamb", "宮保羊", "Sliced lamb sautéed with water chestnuts, peanuts, scallions and dried hot peppers in a hot and spicy brown sauce.", 18.95],
      ["Lamb with Asparagus", "蘆筍羊", "Sliced lamb sautéed with asparagus and carrot in a brown sauce.", 20.95],
      ["Mongolian Beef", "蔥爆牛", "Sliced beef sautéed with spring onion and white onion in a brown sauce.", 19.50, "popular"],
      ["Mongolian Lamb", "蔥爆羊", "Sliced lamb sautéed with green onion and white onion in a brown sauce.", 19.50],
      ["Moo Shu Beef", "木須牛", "Shredded beef sautéed with shredded cabbage, mushrooms, bamboo shoots, wood ear mushroom, scrambled egg and green onion, seasoned with soy sauce.", 15.75],
      ["Sha Cha Beef", "沙茶牛", "Shredded beef sautéed with carrot, celery, onion and green pepper in a hot and spicy Chinese sha cha barbecue sauce.", 17.65]
    ]
  },
  {
    id: "pork", name: "Pork", zh: "豬",
    items: [
      ["Double Cooked Pork", "回鍋肉", "Sliced pork sautéed with cabbage, green pepper, bamboo shoots, black mushrooms and dried tofu in a hot and spicy brown bean sauce.", 15.50],
      ["Mongolian Pork", "蔥爆肉", "Sliced pork sautéed with spring onion and white onion in a brown sauce.", 15.50],
      ["Moo Shu Pork", "木須肉", "Shredded pork sautéed with shredded cabbage, mushrooms, bamboo shoots and wood ear mushroom, seasoned with soy sauce. Served with pancakes.", 15.75],
      ["Peking Style Pork Chop", "京都排骨", "Pork chop lightly fried crispy and sautéed in a tomato-flavored sauce.", 19.95],
      ["Salt & Pepper Pork Chop", "椒鹽排骨", "Pork chop lightly fried and tossed with fresh hot pepper, scallion and salt and pepper seasoning.", 19.95],
      ["Pork, Szechuan Style", "干燒肉絲", "Shredded pork sautéed with shredded carrot and celery in a hot and spicy brown bean sauce.", 15.50],
      ["Pork with String Beans", "四季豆肉絲", "Shredded pork sautéed with string beans in a brown sauce.", 15.50],
      ["Pork with Black Bean Sauce", "", "Sliced pork sautéed with green pepper, onion and bamboo shoots in a hot and spicy black bean sauce.", 15.50],
      ["Pork with Hot Garlic Sauce", "魚香肉絲", "Shredded pork with shredded carrot and celery, water chestnuts, broccoli and wood ear mushroom in a hot and spicy garlicky brown sauce.", 15.50],
      ["Roast Pork with Mixed Vegetables", "素菜叉燒", "Sliced roast pork sautéed with mixed vegetables in a brown sauce.", 15.50],
      ["Roast Pork with Snow Peas", "雪豆叉燒", "Sliced roast pork sautéed with snow peas and water chestnuts in a brown sauce.", 15.50],
      ["Sha Cha Pork", "沙茶肉絲", "Shredded pork sautéed with shredded carrot, celery, green pepper and onion in a hot and spicy Chinese barbecue sauce.", 15.50],
      ["Shredded Pork with Dried Tofu", "香干肉絲", "Shredded pork sautéed with shredded carrot, snow peas, bamboo shoots, fresh chili pepper and dried tofu in a brown sauce.", 15.95],
      ["Sliced Pork, Hunan Style", "湖南肉", "Sliced pork sautéed with broccoli, straw mushrooms and baby corn in a hot and spicy brown sauce.", 15.50],
      ["Spicy Tangy Sliced Pork", "麻辣肉", "Sliced pork sautéed with green pepper and carrot in a hot and spicy light brown sauce.", 15.50],
      ["Sweet & Sour Pork", "甜酸肉", "Battered cubes of pork fried crispy with green pepper, onion, carrot and pineapple in a sweet and sour sauce.", 15.50]
    ]
  },
  {
    id: "seafood", name: "Seafood", zh: "海鮮",
    items: [
      ["Baby Shrimp with Cashew Nuts", "腰果蝦仁", "Baby shrimp sautéed with snow peas, carrot and straw mushrooms in a white sauce.", 20.50],
      ["Calamari, Hunan Style", "湖南魷魚", "Bite-size calamari sautéed with broccoli, baby corn, straw mushrooms and bamboo shoots in a hot and spicy brown sauce.", 19.50],
      ["Calamari with Black Bean Sauce", "豉椒鮮魷", "Bite-size calamari sautéed with green pepper and onion in a hot and spicy black bean sauce.", 19.50],
      ["Cashew Chicken & Baby Shrimp", "腰果雙丁", "Baby shrimp and diced dark meat chicken sautéed with cashew nuts, water chestnuts and scallion in a brown bean sauce.", 19.50],
      ["Crispy Fish Fillet, General Tso Sauce", "左公魚片", "Cod fillet fried crispy and topped with a spicy, tangy General Tso sauce.", 23.20],
      ["Curry Scallops", "加厘干貝", "Scallops sautéed with green pepper, onion and carrot in a yellow curry sauce, not hot.", 22.20],
      ["Curry Shrimp", "加厘蝦", "Jumbo shrimp sautéed with green pepper, carrot and onion in a yellow curry sauce, not hot.", 20.50],
      ["Hot & Spicy Baby Shrimp", "干燒蝦仁", "Baby shrimp sautéed with diced onion in a spicy tomato-based sauce.", 20.75],
      ["Hot & Spicy Fish Fillet", "干燒魚片", "Battered fish fillet fried crispy and cooked in a spicy tomato-flavored sauce.", 23.20],
      ["Hunan Scallops", "湖南干貝", "Scallops stir-fried with broccoli and straw mushrooms in a spicy brown sauce.", 22.20],
      ["Hunan Shrimp", "湖南蝦", "Jumbo shrimp sautéed with broccoli, baby corn and straw mushrooms in a spicy brown sauce.", 19.95],
      ["Hunan Shrimp & Scallops", "湖南雙鮮", "Shrimp and scallops sautéed with broccoli, baby corn, straw mushrooms and bamboo shoots in a spicy brown sauce.", 23.20],
      ["Hunan Triple Delight", "炒三鮮", "Shrimp, chicken and beef sautéed with mixed vegetables in a non-spicy brown sauce.", 20.50],
      ["Kung Pao Baby Shrimp", "宮保蝦仁", "Baby shrimp sautéed with peanuts, water chestnuts and dried hot peppers in a spicy brown sauce.", 19.95],
      ["Kung Pao Chicken & Shrimp", "宮保雙丁", "Baby shrimp and diced dark meat chicken sautéed with peanuts, water chestnuts, scallion and dried hot peppers in a spicy brown sauce.", 19.95],
      ["Kung Pao Scallops", "宮保干貝", "Scallops sautéed with water chestnuts, peanuts and dried hot peppers in a hot and spicy sauce.", 23.25],
      ["Kung Pao Triple Delight", "宮保三鮮", "Shrimp, chicken and beef sautéed with water chestnuts, peanuts and dried hot peppers in a hot and spicy brown sauce.", 21.50],
      ["Moo Shu Shrimp", "木須蝦", "Baby shrimp sautéed with shredded cabbage, mushrooms, bamboo shoots and wood ear mushroom. Served with 4 pancakes.", 18.25],
      ["Scallops with Black Bean Sauce", "豉椒干貝", "Scallops sautéed with green pepper and onion in a hot and spicy black bean brown sauce.", 22.20],
      ["Scallops with Vegetables", "素菜干貝", "Scallops sautéed with mixed vegetables in a white sauce.", 22.20],
      ["Scallops with Asparagus", "蘆筍干貝", "Scallops sautéed with asparagus and a little carrot in a white sauce.", 22.95],
      ["Scallops with Hot Garlic Sauce", "魚香干貝", "Scallops sautéed with celery, carrot, water chestnuts, wood ear mushroom and a little broccoli in a hot garlic brown sauce.", 22.95],
      ["Scallops with Snow Peas", "雪豆干貝", "Scallops sautéed with snow peas and water chestnuts in a white sauce.", 22.95],
      ["Shrimp with Asparagus", "蘆筍蝦", "Jumbo shrimp sautéed with asparagus and carrot in a white sauce.", 21.50],
      ["Shrimp with Black Bean Sauce", "豉椒蝦", "Jumbo shrimp sautéed with green pepper and water chestnuts in a spicy black bean brown sauce.", 19.95],
      ["Shrimp with Broccoli", "芥蘭蝦", "Jumbo shrimp sautéed with broccoli in a brown sauce.", 19.95],
      ["Shrimp with Lobster Sauce", "蝦龍糊", "Jumbo shrimp cooked with mushrooms, water chestnuts, green peas and carrot in a white sauce with egg.", 19.95],
      ["Shrimp with Mixed Vegetables", "素菜蝦", "Jumbo shrimp sautéed with broccoli, snow peas, carrot, mushrooms, water chestnuts, baby corn and bamboo shoots.", 19.95],
      ["Shrimp & Scallops with Hot Garlic Sauce", "魚香雙鮮", "Shrimp and scallops with shredded carrot and celery, water chestnuts, wood ear mushroom and a little broccoli in a hot and spicy brown sauce.", 23.20],
      ["Shrimp & Scallops, Kung Pao Style", "宮保雙鮮", "Shrimp and scallops sautéed with water chestnuts, peanuts and dried hot peppers in a hot and spicy brown sauce.", 23.20],
      ["Shrimp & Scallops with Mixed Vegetables", "素菜雙鮮", "Shrimp and scallops sautéed with mixed vegetables in a white sauce.", 23.20],
      ["Shrimp with Hot Garlic Sauce", "魚香蝦", "Jumbo shrimp with shredded carrot and celery, water chestnuts, wood ear mushroom and a little broccoli in a spicy brown sauce.", 19.95],
      ["Shrimp with Snow Peas", "雪豆蝦", "Jumbo shrimp sautéed with snow peas and water chestnuts in a white sauce.", 19.95],
      ["Sweet & Sour Shrimp", "甜酸蝦", "Breaded shrimp fried crispy with carrot, green pepper, onion and pineapple in sweet and sour sauce. Sauce comes on the side for carryout.", 19.95],
      ["Triple Delight with Hot Garlic Sauce", "魚香三鮮", "Shrimp, chicken and beef with shredded carrot and celery, water chestnuts, wood ear mushroom and a little broccoli in a hot and spicy brown sauce.", 19.95]
    ]
  },
  {
    id: "vegetable", name: "Vegetable", zh: "素菜",
    items: [
      ["Braised Mixed Vegetables with Vermicelli", "粉絲素菜", "Mixed vegetables, fried tofu and vermicelli noodles in a light sauce.", 14.75],
      ["Chinese Eggplant with Hot Garlic Sauce", "魚香茄子", "Eggplant with a little carrot, celery, water chestnut and wood ear mushroom.", 13.95],
      ["Fried Tofu, Kung Pao Sauce", "宮保炸豆腐", "", 14.95],
      ["Fried Tofu, General Tso Sauce", "左公炸豆腐", "", 14.95],
      ["Fried Tofu with Mixed Vegetables", "家常豆腐", "Also called home-style fried tofu.", 13.95],
      ["Sautéed Mixed Vegetables", "素什錦", "Broccoli, snow peas, mushrooms, carrot, baby corn, bamboo shoots, water chestnuts and cabbage.", 13.95],
      ["Moo Shu Vegetables", "木須素菜", "Served with pancakes: 3 at lunch, 4 at dinner.", 14.50],
      ["Sautéed Broccoli, White Sauce", "清炒芥蘭", "", 13.95],
      ["Sautéed Chinese Broccoli", "清炒中國芥蘭", "Sautéed with fresh garlic in a white sauce.", 15.50],
      ["Snow Peas & Water Chestnuts", "雪豆馬蹄", "In a white sauce.", 13.95],
      ["Steamed Vegetables & Tofu", "清蒸素菜豆腐", "Sauce comes on the side.", 13.95],
      ["String Beans, Szechuan Style", "干扁四季豆", "", 13.95],
      ["Tofu, Hunan Style", "湖南豆腐", "Soft tofu with bamboo shoots and spring onion, slow-cooked in a hot black bean brown sauce.", 13.95],
      ["Tofu, Szechuan Style", "麻婆豆腐", "Soft tofu with a few mushrooms, slow-cooked in a hot, peppery brown sauce.", 13.95],
      ["Vegetarian Beef with Vegetables", "齋素菜牛", "Vegetarian. Soy protein beef sautéed with vegetables in a brown sauce.", 15.95],
      ["Vegetarian Chicken Chunks", "齋雞丁", "Vegetarian. Soy protein chicken sautéed with vegetables in a brown sauce.", 15.95],
      ["Vegetarian General Tso Chicken", "齋左公雞", "Vegetarian. Soy protein and mushroom chunks in a corn flour batter with General Tso sauce.", 15.95],
      ["Vegetarian Kung Pao Chicken", "齋宮保雞", "Vegetarian. Soy protein chicken chunks sautéed with broccoli, snow peas, carrot, mushrooms, water chestnuts and peanuts in a hot brown sauce.", 15.95, "popular"]
    ]
  },
  {
    id: "rice-noodles", name: "Rice & Noodles", zh: "飯・麵",
    items: [
      ["Beef Fried Rice", "牛炒飯", "With green peas, carrot and onion.", 13.95],
      ["Beef Lo Mein", "牛撈麵", "", 13.95],
      ["Chicken Fried Rice", "雞炒飯", "White meat chicken with green peas, carrot and onion.", 12.95],
      ["Chicken Lo Mein", "雞撈麵", "", 12.95],
      ["Chow Fun", "炒河粉", "Wide rice noodles sautéed with your choice of meat or seafood and vegetables in a brown sauce.", 14.95],
      ["Chow Fun with Black Bean Sauce", "濕炒豉椒河粉", "Wide rice noodles with your choice of meat or seafood, green pepper and onion in black bean sauce.", 14.95],
      ["Chow Mein", "炒麵", "Your choice of meat or seafood with soft-cooked Chinese cabbage, bean sprouts and onion.", 14.95],
      ["Combination Fried Rice", "什錦炒飯", "Shrimp, chicken and pork with green peas, carrot and onion.", 13.95],
      ["Combination Lo Mein", "什錦撈麵", "", 13.95],
      ["Curry Fried Rice", "加厘炒飯", "With green peas, carrot and onion in a yellow curry seasoning, not hot.", 13.95],
      ["Egg Fried Rice", "蛋炒飯", "", 11.95],
      ["House Pan-Fried Noodles", "本樓二麵王", "Triple delight (chicken, beef, shrimp and vegetables in a brown sauce) over a bed of pan-fried noodles.", 19.95],
      ["House Rice Stick Noodles", "本樓米粉", "Angel-hair rice noodles sautéed with chicken, pork, shrimp and vegetables in a light brown sauce.", 14.95],
      ["Noodle Soup", "湯麵", "Your choice of meat or seafood with snow peas, carrot and Chinese cabbage.", 13.95],
      ["Roast Pork Fried Rice", "叉燒炒飯", "With green peas, carrot and onion.", 12.95],
      ["Roast Pork Lo Mein", "叉燒撈麵", "", 12.95],
      ["Shrimp Fried Rice", "蝦炒飯", "With green peas, carrot and onion.", 13.95],
      ["Shrimp Lo Mein", "蝦撈麵", "", 13.95],
      ["Singapore Rice Stick Noodles", "星洲炒米粉", "Angel-hair rice noodles sautéed with chicken, pork, shrimp and vegetables in a yellow curry sauce.", 14.95],
      ["Thai Basil Fried Rice", "泰式炒飯", "", 13.95],
      ["Vegetable Fried Rice", "素菜炒飯", "Mixed vegetables in a white sauce, no egg.", 12.95],
      ["Vegetable Lo Mein", "素菜撈麵", "Soft egg noodles sautéed with a variety of vegetables.", 12.95],
      ["Vegetable Pan-Fried Noodles", "素菜二麵王", "Mixed vegetables over a bed of pan-fried egg noodles.", 13.95]
    ]
  },
  {
    id: "egg-foo-young", name: "Egg Foo Young", zh: "芙蓉蛋",
    items: [
      ["Egg Foo Young", "芙蓉蛋", "Chinese omelet with your choice of meat, bean sprouts and onion, topped with brown gravy.", 15.50]
    ]
  },
  {
    id: "thai", name: "Thai Corner", zh: "泰式",
    items: [
      ["Pad See Ew", "泰河粉", "Wide rice noodles with Chinese broccoli and scrambled egg.", 14.95],
      ["Pad Kee Mao (Drunken Noodles)", "泰辣炒河", "Your choice of meat or seafood sautéed with wide rice noodles and vegetables in a spicy Thai sauce.", 14.95],
      ["Pad Thai", "泰炒粉", "Your choice of meat or seafood sautéed with pad thai noodles and vegetables.", 14.95],
      ["Panang Curry", "泰紅咖哩", "Your choice of meat or seafood with vegetables in a spicy red coconut curry sauce.", 18.95, "popular"],
      ["Thai Basil", "香茅", "Your choice of meat or seafood with onion and red pepper in a house Thai basil sauce.", 18.95, "popular"],
      ["Thai Basil Triple Delight", "泰茅三樣", "Shrimp, chicken and beef sautéed with onion and bell pepper in Thai basil sauce.", 21.50]
    ]
  },
  {
    id: "dessert", name: "Dessert", zh: "甜品",
    items: [
      ["Cheesecake", "", "One slice.", 5.95],
      ["Golden Buns", "黃金小饅頭", "Three golden buns.", 5.95],
      ["Tiramisu", "", "One slice.", 5.95]
    ]
  },
  {
    id: "extras", name: "Extras", zh: "加點",
    items: [
      ["Extra Rice", "", "Steamed white rice.", 2.00],
      ["Fried Noodles", "", "A small pack of crispy fried noodles.", 1.00]
    ]
  }
];
