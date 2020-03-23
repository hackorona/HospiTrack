import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns
import pandas as pd
from sklearn.metrics import confusion_matrix, accuracy_score, precision_score, recall_score, f1_score, matthews_corrcoef

def evaluate_model(y_true, y_pred):
    """
    The function gets y_true + y_pred and calculates the evaluation for the prediction
    :param y_true: dataframe, y test
    :param y_pred: dataframe, y pred
    :return: print of : Confusion matrix, f1 Score, Accuracy, Precision, Recall and MCC Score.
    """
    print('Confusion matrix:' + '\n' + str(confusion_matrix(y_true, y_pred)))
    print("f1 Score : ",f1_score(y_true, y_pred,
                                           pos_label='positive',
                                           average='macro'))
    print("Accuracy Score : " + str(accuracy_score(y_true, y_pred)))
    print("Precision Score : ",precision_score(y_true, y_pred,
                                           pos_label='positive',
                                           average='macro'))
    print("Recall Score : ",recall_score(y_true, y_pred,
                                           pos_label='positive',
                                           average='macro'))
    print("MCC Score : " + str(matthews_corrcoef(y_true, y_pred)))

def plot_results(lst, results):
    """
    The function gets list of disntances and pred dataframe then return figure of the results
    :param lst: list, list of distances
    :param results: dataframe, y_pred
    :return: figure of the results
    """
    a = plt.figure(figsize=(10, 10))

    srt = np.sort(lst)
    srt90 = srt[0:int( 0.90 *len(srt))]
    srt80 = srt[0:int( 0.80 *len(srt))]

    plt.subplots_adjust(wspace = 0.5 , hspace = 0.5)

    plt.subplot(4 ,3, 1)
    plt.hist(srt)
    plt.xlabel('distance [m]')
    plt.ylabel('count')
    plt.grid(True)
    plt.title('Histogram of distances')

    plt.subplot(4 ,3, 2)
    plt.hist(srt90)
    plt.xlabel('distance [m]')
    plt.ylabel('count')
    plt.grid(True)
    plt.title('Histogram of distances (90%)')

    plt.subplot(4 ,3, 3)
    plt.hist(srt80)
    plt.xlabel('distance [m]')
    plt.ylabel('count')
    plt.grid(True)
    plt.title('Histogram of distances (80%)')

    plt.subplot(4 ,3, 4)
    plt.plot(srt ,'*')
    plt.xlabel('index')
    plt.ylabel('distance [m]')
    plt.grid(True)
    plt.title('Plot of distances')

    plt.subplot(4 ,3, 5)
    plt.plot(srt90 ,'*')
    plt.xlabel('index')
    plt.ylabel('distance [m]')
    plt.grid(True)
    plt.title('Plot of distances (90%)')

    plt.subplot(4 ,3, 6)
    plt.plot(srt80 ,'*')
    plt.xlabel('index')
    plt.ylabel('distance [m]')
    plt.grid(True)
    plt.title('Plot of distances (80%)')

    plt.subplot(4 ,3, 7)
    plt.boxplot(srt)
    plt.ylabel('distance [m]')
    plt.grid(True)
    plt.title('Boxplot of distances')

    plt.subplot(4 ,3, 8)
    plt.boxplot(srt90)
    plt.ylabel('distance [m]')
    plt.grid(True)
    plt.title('Boxplot of distances (90%)')

    plt.subplot(4 ,3, 9)
    plt.boxplot(srt80)
    plt.ylabel('distance [m]')
    plt.grid(True)
    plt.title('Boxplot of distances (80%)')


    plt.subplot(4 ,3, 10)
    block = 100000
    sns.scatterplot(x=results[results['dist' ] <=block]['pred_x'],
                    y=results[results['dist' ] <=block]['pred_y'])

    plt.subplot(4 ,3, 11)
    block = 11
    sns.scatterplot(x=results[results['dist' ] <=block]['pred_x'],
                    y=results[results['dist' ] <=block]['pred_y'])

    plt.subplot(4 ,3, 12)
    block = 6
    sns.scatterplot(x=results[results['dist' ] <=block]['pred_x'],
                    y=results[results['dist' ] <=block]['pred_y'])


    return plt.show(a)

def l2_dist(p1, p2):
    """
    The function gets two lists of points and calculates the distance between each set of points
    :param p1: list, first list of points
    :param p2: list, second list of points
    :return: mean distance, all distances
    """
    x1,y1 = p1
    x2,y2 = p2
    x1, y1 = np.array(x1), np.array(y1)
    x2, y2 = np.array(x2), np.array(y2)
    dx = x1 - x2
    dy = y1 - y2
    dx = dx ** 2
    dy = dy ** 2
    dists = dx + dy
    dists = np.sqrt(dists)
    return np.mean(dists), dists